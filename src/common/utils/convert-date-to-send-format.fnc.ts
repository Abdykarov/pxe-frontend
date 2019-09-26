import * as moment from 'moment';

import { CONSTS } from 'src/app/app.constants';

export const convertDateToSendFormatFnc = (date: Date) => moment(date).format(CONSTS.DATE_FORMAT.SHORT);
