import {gql} from 'apollo-angular';


export const loadConfigMutation = gql`
    mutation loadConfig($config: NavigationConfigInput) {
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
