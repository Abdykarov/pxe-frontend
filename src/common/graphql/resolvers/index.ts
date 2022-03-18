import * as R_ from 'ramda-extension';
import createUser from './create-user';
import offer from './offer';
import ui from './ui';

const { defaults, resolvers } = R_.mergeDeepLeftAll([offer, ui, createUser]);

export { defaults, resolvers };
