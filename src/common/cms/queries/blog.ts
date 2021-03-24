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
          allType {
            flatData {
              label,
              order,
              title
              seo {
                flatData {
                  description,
                  keywords,
                  title
                }
              }
              url
            }
          }
        }
      }
    }
`;

export const getLpArticles =  gql`
    query queryArticleContents {
      queryArticleContents (filter: "data/oneOfMostVisited/iv eq true", top: 3, orderby:"data/date/iv desc"){
          flatData {
            content,
            header,
            img {
              url
            },
            type {
              flatData {
                url,
              }
            },
            oneOfMostVisited,
            url,
            date
        }
      }
    }
`;
