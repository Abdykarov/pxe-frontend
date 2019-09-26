import gql from 'graphql-tag';

export const toggleOverlayMutation = gql`
    mutation toggleOverlay($value: Boolean) {
        toggleOverlay(value: $value) @client
    }
`;
