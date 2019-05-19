import * as R_ from 'ramda-extension';

import counter from './counter';
import supply from './supply';
import ui from './ui';
import user from './user';
import visibility from './visibility';

const {defaults, resolvers} = R_.mergeDeepLeftAll([counter, visibility, ui/*, user, supply*/]);

export {defaults, resolvers};
