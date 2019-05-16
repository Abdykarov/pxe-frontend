const defaults = {
    user: {
        userPayload: {
            __typename: 'UserPayload',
        },
        __typename: 'User',
    },
};

const resolvers = {
    Mutation: {
        userLogin: (_, variables, {cache}) => {
            const userPayload = variables.userPayload;
            const data = {
                user: {
                    userPayload,
                    __typename: 'UserPayload',
                },
                __typename: 'User',
            };
            cache.writeData({data});
            return null;
        },
    },
};

export default { resolvers, defaults };
