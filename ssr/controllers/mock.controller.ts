import {server} from '../init';

console.log('AHOJ_ MOCK CONTROLLER');

server.get('/graphql', (req, res) => {
    res.status(404).send('data requests are not supported');
});
