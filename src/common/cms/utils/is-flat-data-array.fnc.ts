import * as R from 'ramda';
import { flatData } from './flat-data.fnc';

export const isFlatDataArray = R.allPass([Array.isArray, R.all(flatData)]);
