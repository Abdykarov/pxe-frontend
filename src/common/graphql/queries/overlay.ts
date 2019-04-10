import gql from 'graphql-tag';

export const showOverlay = gql`
    query {
        ui @client{
            showOverlay
        }
    }
`;
