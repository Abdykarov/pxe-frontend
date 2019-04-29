import * as R_ from 'ramda-extension';

import counter from './counter';
import supply from './supply';
import ui from './ui';
import visibility from './visibility';

const {defaults, resolvers} = R_.mergeDeepLeftAll([counter, visibility, ui, supply]);

export {defaults, resolvers};
