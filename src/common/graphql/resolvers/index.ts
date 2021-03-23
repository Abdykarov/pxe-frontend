import * as R_ from 'ramda-extension';

import offer from './offer';
import ui from './ui';
import createUser from './create-user';

const {defaults, resolvers} = R_.mergeDeepLeftAll([
    offer,
    ui,
    createUser,
]);

export {defaults, resolvers};
