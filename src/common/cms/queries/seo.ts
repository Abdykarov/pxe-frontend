import {gql} from 'apollo-angular';


export const seoFragment = gql`
    fragment seoFragment on SeoContent {
        flatData {
          description,
          keywords,
          title
        }
    }
`;
