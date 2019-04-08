import gql from 'graphql-tag';

export const toggleOverlay = gql`
    mutation toggleOverlay($value: boolean = null) {
        toggleOverlay(value: $value) @client
    }
`;
