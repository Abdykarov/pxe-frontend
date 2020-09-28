import gql from 'graphql-tag';

export const getNewsQuery = gql`
    query queryNewsContents {
        queryNewsContents {
            data {
                news {
                    iv {
                        date,
                        new
                    }
                },
            }
        }
    }`;
