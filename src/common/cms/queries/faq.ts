import {gql} from 'apollo-angular';


import { seoFragment } from './seo';

export const questionsQuery = gql`
    query queryQuestionContents {
      queryQuestionContents (orderby:"data/header/iv", top: 100){
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
      queryTagContents (orderby:"data/order/iv asc"){
        flatData {
          type
          url
          label
          title,
          order
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
          order
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
