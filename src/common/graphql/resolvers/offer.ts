export const defaults = {};

export const resolvers = {
    Offer: {
        marked(_, variables, { cache }) {
            return false;
        },
        isLastUpdated(_, variables, { cache }) {
            return false;
        },
    },
};

export default { resolvers, defaults };
