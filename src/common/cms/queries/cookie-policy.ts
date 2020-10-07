import gql from 'graphql-tag';

export const cookiePolicyQuery = gql`
query queryCookiePolicyContents {
  queryCookiePolicyContents {
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
