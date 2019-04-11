const defaults = {
    visibility: {
        current: false,
        __typename: 'Visibility',
    },
};

const resolvers = {
    Mutation: {
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
    },
};

export default { resolvers, defaults };
