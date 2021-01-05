import gql from 'graphql-tag';

import { seoFragment } from './seo';

export const getLandingPageQuery = gql`
    query queryLandingPageContents {
      queryLandingPageContents {
        flatData {
          helpSection {
            flatData {
              cards {
                content
                customClasses
                imgAlt
                imgTitle
                title
                img {
                  url
                }
              }
              title
            }
          }
          carouselReferences {
            flatData {
              city,
              imgAlt,
              name,
              reference,
              img {
                url
              }
            }
          }
          seo {
            ...seoFragment
          }
        },
      }
    }
    ${seoFragment}
`;
