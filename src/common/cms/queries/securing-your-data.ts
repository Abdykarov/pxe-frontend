import gql from 'graphql-tag';

import { seoFragment } from './seo';

export const securingYourDataQuery = gql`
query querySecuringYourDataContents {
  querySecuringYourDataContents {
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
