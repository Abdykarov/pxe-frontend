import {gql} from 'apollo-angular';


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
