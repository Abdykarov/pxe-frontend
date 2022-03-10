const controller = {
    graphql: (req, res) => {
        res.status(404).send('data requests are not supported');
    },
};

export default controller;
