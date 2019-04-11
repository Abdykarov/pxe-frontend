import * as R_ from 'ramda-extension';

import counter from './counter';
import ui from './ui';
import visibility from './visibility';

const {defaults, resolvers} = R_.mergeDeepLeftAll([counter, visibility, ui]);

export {defaults, resolvers};
