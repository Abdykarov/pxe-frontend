import gql from 'graphql-tag';

import { seoFragment } from './seo';

export const questionsQuery = gql`
    query queryQuestionContents {
      queryQuestionContents {
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

export const faqQuery = gql`
query queryFaqContents {
  queryFaqContents {
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
