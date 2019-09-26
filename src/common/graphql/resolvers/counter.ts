import gql from 'graphql-tag';

const defaults = {
    counter: {
        current: 0,
        __typename: 'Counter',
    },
};

const resolvers = {
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
    },
};

export default { resolvers, defaults };
