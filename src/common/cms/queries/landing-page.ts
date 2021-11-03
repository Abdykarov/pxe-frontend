import {gql} from 'apollo-angular';


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
          aboutUs {
            flatData {
              title,
              buttonText,
              chatText,
              bigText,
              description,
              logos {
                alt,
                faq {
                  flatData {
                    tag {
                      flatData {
                        url
                      }
                    }
                    url
                  }
                }
                logo {
                  url
                }
                title,
                width
              }
            }
          }
          iWantToSeeTheBestOffers {
            flatData {
              buttonText,
              title
            }
          }
        },
      }
    }
    ${seoFragment}
`;
