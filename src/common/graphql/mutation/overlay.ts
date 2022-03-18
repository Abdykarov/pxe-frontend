import { gql } from 'apollo-angular';

export const toggleOverlayMutation = gql`
    mutation toggleOverlay($value: Boolean) {
        toggleOverlay(value: $value) @client
    }
`;
