import gql from 'graphql-tag';

export const securingYourDataQuery = gql`
query querySecuringYourDataContents {
  querySecuringYourDataContents {
    flatData {
      title,
      breadcrumbTitle,
      htmlContent,
      seo {
        flatData {
          description,
          keywords {
            keyword
          },
          title
        }
      }
    },
  }
}
`;
