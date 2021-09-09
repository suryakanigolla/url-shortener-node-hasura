const { GraphQLClient, gql } = require("graphql-request");

const HASURA_URI = process.env.HASURA_URI;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

const apolloClient = new GraphQLClient(HASURA_URI, {
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
});

const getUrlQuery = gql`
  query MyQuery($slug: String!) {
    urls(where: { slug: { _eq: $slug } }) {
      id
      slug
      url
    }
  }
`;

const getAllUrls = gql`
  query MyQuery {
    urls {
      id
      slug
      url
    }
  }
`;

const addUrl = gql`
  mutation MyMutation($slug: String!, $url: String!) {
    insert_urls_one(object: { slug: $slug, url: $url }) {
      id
      slug
      url
    }
  }
`;

module.exports = {
  apolloClient,
  getUrlQuery,
  getAllUrls,
  addUrl,
};
