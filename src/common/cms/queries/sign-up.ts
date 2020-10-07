import gql from 'graphql-tag';

export const signUpQuery = gql`
query querySignUpContents {
  querySignUpContents {
    flatData {
      title,
      leftContent,
      bubbleText,
      seo {
        flatData {
          description,
          keywords,
          title
        }
      }
    },
  }
}
`;
