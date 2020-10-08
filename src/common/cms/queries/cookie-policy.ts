import gql from 'graphql-tag';

import { seoFragment } from './seo';

export const cookiePolicyQuery = gql`
query queryCookiePolicyContents {
  queryCookiePolicyContents {
    flatData {
      title,
      breadcrumbTitle,
      htmlContent,
      seo {
        ...seoFragment
      }
    },
  }
}
${seoFragment}
`;
