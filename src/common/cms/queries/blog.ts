import gql from 'graphql-tag';

export const getBlog = gql`
    query queryBlogContents {
      queryBlogContents {
        flatData {
          title,
          breadcrumpTitle,
          seo {
            flatData {
              description,
              keywords,
              title
            }
          },
          articles {
            flatData {
              url,
              type {
                flatData{
                  label,
                  title,
                  url
                },
              },
              header,
              oneOfMostVisited,
              content
            }
          }
        }
      }
    }
`;
