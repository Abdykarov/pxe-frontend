import gql from 'graphql-tag';

import { seoFragment } from './seo';

export const signUpQuery = gql`
query querySignUpContents {
  querySignUpContents {
    flatData {
      title,
      leftContent,
      bubbleText,
      seo {
        ...seoFragment
      }
    },
  }
}
${seoFragment}
`;
