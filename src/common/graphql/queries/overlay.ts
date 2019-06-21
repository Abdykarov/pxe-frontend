import gql from 'graphql-tag';

export const showOverlayQuery = gql`
    query {
        ui @client{
            showOverlay
        }
    }
`;
