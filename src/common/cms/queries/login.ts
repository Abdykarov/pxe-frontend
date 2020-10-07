import gql from 'graphql-tag';

export const loginQuery = gql`
query queryLoginContents {
  queryLoginContents {
    flatData {
      title,
      leftContent,
      seo {
        flatData {
          description,
          keywords,
          title
        }
      }
    },
  }
}
`;
