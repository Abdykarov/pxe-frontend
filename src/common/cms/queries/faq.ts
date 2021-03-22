import gql from 'graphql-tag';

import { seoFragment } from './seo';

export const questionsQuery = gql`
    query queryQuestionContents {
      queryQuestionContents (orderby:"data/header/iv"){
        flatData {
          id
          fullContent
          shortContent
          isTestData
          oneOfMostVisited
          seoKeywords
          tag {
            flatData {
              label
              type
              url
              title
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
          type
          url
          label
          title
        }
      }
    }`;

export const faqQuery = gql`
query queryFaqContents {
  queryFaqContents {
    flatData {
      title,
      breadcrumbTitle,
      tag {
        flatData {
          type
          url
          label
          title
        },
      },
      seo {
        ...seoFragment
      }
    },
  }
}
${seoFragment}
`;
