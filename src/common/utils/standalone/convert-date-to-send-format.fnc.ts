import * as moment from 'moment';

import { CONSTS } from 'src/app/app.constants';

export const convertDateToSendFormatFnc = (date: Date) => date ? moment(date).format(CONSTS.DATE_FORMAT.SHORT) : null;
