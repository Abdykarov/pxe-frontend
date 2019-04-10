import gql from 'graphql-tag';

export const incrementCounter = gql`
    mutation incrementCounter {
        incrementCounter @client
    }
`;

export const decrementCounter = gql`
    mutation decrementCounter {
        decrementCounter @client
    }
`;

export const resetCounter = gql`
    mutation resetCounter {
        resetCounter @client
    }
`;

export const toggleVisibility = gql`
    mutation toggleVisibility($visibility: Boolean!) {
        toggleVisibility(visibility: $visibility) @client
    }
`;
