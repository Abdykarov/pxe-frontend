import { getConfigQuery } from 'src/common/graphql/queries/navigation';

export const defaults = {
    ui: {
        securedLayout: null,
        showOverlay: false,
        __typename: 'ui',
    },
};

export const resolvers = {
    Mutation: {
        toggleOverlay: (_, variables, { cache }) => {
            const prev = cache.readQuery({ query: getConfigQuery });
            const data = {
                ui: {
                    securedLayout: prev.ui.securedLayout
                        ? {
                              navigationConfig:
                                  prev.ui.securedLayout.navigationConfig,
                              navigationItemOpened:
                                  prev.ui.securedLayout.navigationItemOpened,
                              __typename: 'securedLayout',
                          }
                        : null,
                    showOverlay:
                        variables.value === null
                            ? !prev.ui.showOverlay
                            : variables.value,
                    __typename: 'ui',
                },
            };
            cache.writeQuery({
                query: getConfigQuery,
                data,
            });
            return data;
        },
        loadConfig: (_, variables, { cache }) => {
            const data = {
                ui: {
                    securedLayout: {
                        navigationConfig: variables.config,
                        navigationItemOpened: null,
                        __typename: 'securedLayout',
                    },
                    showOverlay: false,
                    __typename: 'ui',
                },
            };
            cache.writeQuery({
                query: getConfigQuery,
                data,
            });
            return data;
        },
        openItem: (_, variables, { cache }) => {
            const prev = cache.readQuery({ query: getConfigQuery });
            const data = {
                ui: {
                    securedLayout: {
                        navigationConfig:
                            prev.ui.securedLayout.navigationConfig,
                        navigationItemOpened: variables.item,
                        __typename: 'securedLayout',
                    },
                    showOverlay: false,
                    __typename: 'ui',
                },
            };
            cache.writeQuery({
                query: getConfigQuery,
                data,
            });
            return data;
        },
        logout: (_, variables, { cache }) => {
            const data = {
                ui: {
                    securedLayout: null,
                    showOverlay: false,
                    __typename: 'ui',
                },
            };
            cache.writeData({ data });
            return null;
        },
    },
};

export default { resolvers, defaults };
