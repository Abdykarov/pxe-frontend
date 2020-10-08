import gql from 'graphql-tag';

export const seoFragment = gql`
    fragment seoFragment on SeoContent {
        flatData {
          description,
          keywords,
          title
        }
    }
`;
