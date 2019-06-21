import gql from 'graphql-tag';

export const loadConfigMutation = gql`
    mutation loadConfig($config: any) {
        loadConfig(config: $config) @client
    }
`;

export const openItemMutation = gql`
    mutation openItem($item: any) {
        openItem(item: $item) @client
    }
`;

export const logout = gql`
    mutation logout {
        logout @client
    }
`;
