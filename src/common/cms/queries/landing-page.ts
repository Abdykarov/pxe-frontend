import gql from 'graphql-tag';

export const getLandingPageQuery = gql`
    query queryLandingPageContents {
      queryLandingPageContents {
        flatData {
          howItWorks {
            flatData{
              columns
                {
                  description,
                  title
                }
              title
            }
          },
          likeADog {
            flatData {
              buttonText,
              description,
              title
            }
          },
          mapCoverage {
            flatData {
              signature,
              suppliersText,
              title,
            }
          }
          filosofii {
            flatData {
              description,
              description2,
              signature,
              title
            }
          },
          introduction {
            flatData {
              appendix,
              buttonText,
              text,
              title
            }
          }
          seo {
            flatData {
              description,
              keywords,
              title
            }
          },
          aboveSignUp
        },
      }
    }`;
