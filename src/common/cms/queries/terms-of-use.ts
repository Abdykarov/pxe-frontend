import gql from 'graphql-tag';

import { seoFragment } from './seo';

export const termsOfUseQuery = gql`
query queryTermsOfUseContents {
  queryTermsOfUseContents {
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
${seoFragment}`;
