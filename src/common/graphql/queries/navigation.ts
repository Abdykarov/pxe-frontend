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
                }
                navigationItemOpened{
                    label,
                    icon,
                    url
                }
            }
            showOverlay
        }
    }
`;

