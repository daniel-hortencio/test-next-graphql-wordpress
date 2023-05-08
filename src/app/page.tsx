import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://test-frontity-wordpress.000webhostapp.com/graphql"
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

  return posts.map((post: any) => (
    <div key={post.title}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <hr />
    </div>
  ));
}
