import gql from 'graphql-tag';

export const getBlog = gql`
    query queryBlogContents {
      queryBlogContents {
        flatData {
          articles {
            flatData {
              content,
              date,
              header,
              img {
                url
              },
              oneOfMostVisited,
              type {
                flatData {
                  label,
                  seo {
                    flatData {
                      description,
                      keywords,
                      title
                    }
                  },
                  url,
                  order,
                  title
                }
              },
              url,
              seo {
                flatData {
                  description,
                  keywords,
                  title
                }
              }
            }
          }
        }
      }
    }
`;
