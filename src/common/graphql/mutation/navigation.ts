import gql from 'graphql-tag';

export const loadConfig = gql`
    mutation loadConfig($config: any) {
        loadConfig(config: $config) @client
    }
`;

export const openItem = gql`
    mutation openItem($item: any) {
        openItem(item: $item) @client
    }
`;

export const logout = gql`
    mutation logout {
        logout @client
    }
`;
