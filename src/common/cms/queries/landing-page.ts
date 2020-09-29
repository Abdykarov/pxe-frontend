import gql from 'graphql-tag';

export const getLandingPageQuery = gql`
    query queryHowDoesItWorkContents {
        queryHowDoesItWorkContents {
            data {
                title {
                    iv
                },
            }
        }
    }`;
