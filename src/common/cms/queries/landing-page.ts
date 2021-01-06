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
          howItWorksSection {
            flatData {
              buttonText,
              description,
              title,
              steps {
                description,
                title
              }
            }
          }
          bestPricesInTheWorldSection {
            flatData {
              buttonText,
              title,
              carouselDiscount {
                flatData {
                  countingDescription,
                  description,
                  perex,
                  title,
                  prices {
                    description,
                    discount,
                    title
                  }
                }
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
