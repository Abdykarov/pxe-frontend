import gql from 'graphql-tag';

export const toggleOverlay = gql`
    mutation toggleOverlay($value: Boolean) {
        toggleOverlay(value: $value) @client
    }
`;
