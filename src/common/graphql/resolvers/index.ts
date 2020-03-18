import * as R_ from 'ramda-extension';

import offer from './offer';
import ui from './ui';

const {defaults, resolvers} = R_.mergeDeepLeftAll([
    offer,
    ui,
]);

export {defaults, resolvers};
