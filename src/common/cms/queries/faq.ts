import gql from 'graphql-tag';

export const questionsQuery = gql`
    query queryQuestionContents {
      queryQuestionContents {
        flatData {
          id
          fullContent
          shortContent
          isTestData
          oneOfMostVisited
          tag {
            flatData {
              label
              type
              url
            }
          }
          header
          url
          vatNumber
        }
      }
    }`;

export const faqConfigQuery = gql`
    query queryTagContents {
      queryTagContents {
        flatData {
          type,
          url,
          label,
        }
      }
    }`;
