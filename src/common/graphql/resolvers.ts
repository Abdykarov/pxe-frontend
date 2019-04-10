import gql from 'graphql-tag';

import { getConfig } from './queries/navigation';

export const defaults = {
    counter: {
        current: 0,
        __typename: 'Counter',
    },
    visibility: {
        current: false,
        __typename: 'Visibility',
    },
    ui: {
        securedLayout: null,
        showOverlay: false,
        __typename: 'ui',
    },
};

export const resolvers = {
    Mutation: {
        incrementCounter: (_, variables, {cache}) => {
            const query = gql`
                query {
                    counter {
                        current
                    }
                }
            `;
            const prev = cache.readQuery({query});
            const current = prev.counter.current + 1;
            const data = {
                counter: {
                    current,
                    __typename: 'Counter',
                },
            };
            cache.writeData({data});
            return null;
        },
        decrementCounter: (_, variables, {cache}) => {
            const query = gql`
                query {
                    counter {
                        current
                    }
                }
          `;
            const prev = cache.readQuery({query});
            const current = prev.counter.current - 1;
            const data = {
                counter: {
                    current,
                    __typename: 'Counter',
                },
            };
            cache.writeData({data});
            return null;
        },
        resetCounter: (_, variables, {cache}) => {
            const {counter} = defaults;
            cache.writeData({
                data: {counter},
            });
            return null;
        },
        toggleVisibility: (_, variables, {cache}) => {
            const data = {
                visibility: {
                    current: variables.visibility,
                    __typename: 'Visibility',
                },
            };
            cache.writeData({data});
            return null;
        },
        toggleOverlay: (_, variables, {cache}) => {
            const prev = cache.readQuery({query: getConfig});
            const data = {
                ui: {
                    securedLayout: prev.ui.securedLayout ? {
                        navigationConfig: prev.ui.securedLayout.navigationConfig,
                        navigationItemOpened: prev.ui.securedLayout.navigationItemOpened,
                        __typename: 'securedLayout',
                    } : null,
                    showOverlay: variables.value === null ? !prev.ui.showOverlay : variables.value,
                    __typename: 'ui',
                },
            };
            cache.writeData({data});
            return data;
        },
        loadConfig: (_, variables, {cache}) => {
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
                    showOverlay: false,
                    __typename: 'ui',
                },
            };
            cache.writeData({data});
            return data;
        },
        logout: (_, variables, {cache}) => {
            const data = {
                ui: {
                    securedLayout: null,
                    showOverlay: false,
                    __typename: 'ui',
                },
            };
            cache.writeData({data});
            return null;
        },
    },
};
