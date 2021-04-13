import gql from 'graphql-tag';

export const getConfigQuery = gql`
    query {
        ui @client{
            securedLayout {
                navigationConfig {
                    label,
                    icon,
                    url,
                    class,
                    type,
                    children {
                        label,
                        url,
                    },
                    onlyInProvider
                }
                navigationItemOpened{
                    label,
                    icon,
                    url,
                }
            }
            showOverlay
        }
    }
`;

