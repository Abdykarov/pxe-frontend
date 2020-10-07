import gql from 'graphql-tag';

export const termsOfUseQuery = gql`
query queryTermsOfUseContents {
  queryTermsOfUseContents {
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
}`;
