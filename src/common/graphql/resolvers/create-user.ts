import { getCreateUserQuery } from '../queries/supply-point-import';

export const defaults = {
    createUser: {
        activeSupplyPoint: null,
        __typename: 'createUser',
    },
};

export const resolvers = {
    Mutation: {
        setActiveSupplyPoint: (_, { supplyPoint }, { cache }) => {
            const { createUser } = cache.readQuery({
                query: getCreateUserQuery,
            });
            const data = {
                createUser: {
                    ...createUser,
                    activeSupplyPoint: supplyPoint,
                    __typename: 'createUser',
                },
            };

            cache.writeQuery({
                query: getCreateUserQuery,
                data,
            });
            return data;
        },
    },
};

export default { resolvers, defaults };
