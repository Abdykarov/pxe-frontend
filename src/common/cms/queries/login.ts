import { gql } from 'apollo-angular';
import { seoFragment } from './seo';

export const loginQuery = gql`
    query queryLoginContents {
        queryLoginContents {
            flatData {
                title
                seo {
                    ...seoFragment
                }
            }
        }
    }
    ${seoFragment}
`;
