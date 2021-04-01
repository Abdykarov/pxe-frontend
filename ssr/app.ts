import {  server} from './init';
import './init';
import './controllers';

// Start up the Node server
server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

export * from '../src/app.server';
