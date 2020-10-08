import gql from 'graphql-tag';

import { seoFragment } from './seo';

export const patternsOfContractsQuery = gql`
query queryPatternsOfContractsContents {
  queryPatternsOfContractsContents {
    flatData {
      title,
      breadcrumbTitle,
      seo {
        ...seoFragment
      }
    },
  }
}
${seoFragment}
`;
