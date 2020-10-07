import gql from 'graphql-tag';

export const patternsOfContractsQuery = gql`
query queryPatternsOfContractsContents {
  queryPatternsOfContractsContents {
    flatData {
      title,
      breadcrumbTitle,
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
