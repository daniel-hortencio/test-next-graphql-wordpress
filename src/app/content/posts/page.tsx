import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://routeasy.com.br/content/graphql"
  //"https://test-frontity-wordpress.000webhostapp.com/graphql"
  // https://routeasy.com.br/content/wp-admin/admin.php?isQueryComposerOpen=true&page=graphiql-ide&query=I4VwpgTgngBAcmA7gRXNGBvAUDGAHAewGcAXIzHXGMAEwHMxzsqqA7AmsCllkgSxIAbMJR4wAxgVYkw00VQC%2B8pbiUKgA
);

const query = gql`
  query NewQuery {
    posts {
      edges {
        node {
          content
          categories {
            nodes {
              name
            }
          }
          title
        }
      }
    }
  }
`;

export const revalidate = 60;

export default async function GraphQLRequest() {
  let posts = [];

  try {
    const posts_response: any = await client.request(query).then((res) => {
      console.log({ res });

      return res;
    });

    posts = posts_response.posts.edges.map((post: any) => post.node);
  } catch (err) {
    console.log("ERROR FROM GRAPHQL-REQUEST API CALL", err);
  }

  return posts?.map((post: any) => (
    <div key={post.title}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <hr />
    </div>
  ));
}
