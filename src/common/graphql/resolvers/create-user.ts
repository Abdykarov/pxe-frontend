import { getActiveAskForOfferIdQuery } from '../queries/supply-point-import';

export const defaults = {
    createUser: {
        activeAskForOfferId: null,
        __typename: 'createUser',
    },
};

export const resolvers = {
    Mutation: {
        setActiveAskForOfferId: (_, variables, {cache}) => {
            const data = {
                createUser: {
                    activeAskForOfferId: variables.askForOfferId,
                    __typename: 'createUser',
                },
            };
            cache.writeQuery(
                {
                    query: getActiveAskForOfferIdQuery,
                    data,
                },
            );
            return data;
        },
    },
};

export default { resolvers, defaults };
