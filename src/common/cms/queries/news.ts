import gql from 'graphql-tag';

export const getNewsQuery = gql`
    query queryNewsContents {
        queryNewsContents {
            flatData {
                news {
                    date,
                    new
                },
            }
        }
    }`;
