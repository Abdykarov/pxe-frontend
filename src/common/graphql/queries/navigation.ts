import gql from 'graphql-tag';

export const getConfig = gql`
    query {
        ui @client{
            securedLayout {
                navigationConfig {
                    label,
                    icon,
                    url
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


export const showOverlay = gql`
    query {
        ui @client{
            showOverlay
        }
    }
`;
