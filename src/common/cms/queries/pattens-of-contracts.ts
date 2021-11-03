import {gql} from 'apollo-angular';


import { seoFragment } from './seo';

export const patternsOfContractsQuery = gql`
query queryPatternsOfContractsContents($filter: String!) {
  queryPatternsOfContractsContents (filter: $filter) {
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
