import * as R from 'ramda';

import {
    ITagConfigItem,
    Tag,
} from 'src/app/services/model/faq.model';

export const getUrlFromTag = (questionTag: Tag, tagConfigs: ITagConfigItem[]): boolean =>
    R.find((tagConfig: ITagConfigItem) => tagConfig.type === questionTag)(tagConfigs).url;
