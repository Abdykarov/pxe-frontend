import gql from 'graphql-tag';

export const getCurrentCounter = gql`
    query {
        counter @client {
            current
        }
    }
`;

export const getVisibility = gql`
    query {
        visibility @client {
            current
        }
    }
`;
