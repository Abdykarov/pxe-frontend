import { gql } from 'apollo-angular';

export const getNewsQuery = gql`
    query queryNewsContents {
        queryNewsContents {
            flatData {
                news {
                    date
                    new
                }
            }
        }
    }
`;
