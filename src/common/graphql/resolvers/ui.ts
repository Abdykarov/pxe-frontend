import { getConfig } from '../queries/navigation';

export const defaults = {
    ui: {
        securedLayout: null,
        __typename: 'ui',
    },
};

export const resolvers = {
    Mutation: {
        loadConfig: (_, variables, {cache}) => {
            const data = {
                ui: {
                    securedLayout: {
                        navigationConfig: variables.config,
                        navigationItemOpened: null,
                        __typename: 'securedLayout',
                    },
                    __typename: 'ui',
                },
            };
            cache.writeData({data});
            return null;
        },
        openItem: (_, variables, {cache}) => {
            const prev = cache.readQuery({query: getConfig});
            const data = {
                ui: {
                    securedLayout: {
                        navigationConfig: prev.ui.securedLayout.navigationConfig,
                        navigationItemOpened: variables.item,
                        __typename: 'securedLayout',
                    },
                    __typename: 'ui',
                },
            };
            cache.writeData({data});
            return null;
        },
        logout: (_, variables, {cache}) => {
            const data = {
                ui: {
                    securedLayout: null,
                    __typename: 'ui',
                },
            };
            cache.writeData({data});
            return null;
        },
    },
};

export default { resolvers, defaults };
