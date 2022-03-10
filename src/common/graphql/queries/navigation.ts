import { gql } from 'apollo-angular';

export const getConfigQuery = gql`
    query {
        ui @client {
            securedLayout {
                navigationConfig {
                    label
                    icon
                    url
                    class
                    type
                    children {
                        label
                        url
                    }
                    allowedLoginProviders
                }
                navigationItemOpened {
                    label
                    icon
                    url
                }
            }
            showOverlay
        }
    }
`;
