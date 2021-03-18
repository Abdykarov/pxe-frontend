import { getCreateUserQuery} from '../queries/supply-point-import';

export const defaults = {
    createUser: {
        activeAskForOfferId: null,
        activeSupplyPoint: null,
        __typename: 'createUser',
    },
};

export const resolvers = {
    Mutation: {
        setActiveAskForOfferId: (_, {askForOfferId}, {cache}) => {
            const { createUser } = cache.readQuery({query: getCreateUserQuery});
            const data = {
                createUser: {
                    ...createUser,
                    activeAskForOfferId: askForOfferId,
                    __typename: 'createUser',
                },
            };

            cache.writeQuery(
                {
                    query: getCreateUserQuery,
                    data,
                },
            );
            return data;
        },
        setActiveSupplyPoint: (_, {supplyPoint}, {cache}) => {
            const { createUser } = cache.readQuery({query: getCreateUserQuery});

            const data = {
                createUser: {
                    ...createUser,
                    activeSupplyPoint: {
                        ...supplyPoint,
                    },
                    __typename: 'createUser',
                },
            };

            console.log(data);

            cache.writeQuery(
                {
                     query: getCreateUserQuery,
                     data,
                },
            );
            return data;
        },
    },
};

export default { resolvers, defaults };
