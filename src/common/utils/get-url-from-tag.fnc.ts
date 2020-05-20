import * as R from 'ramda';

import {
    ITagConfigItem,
    Tag,
} from 'src/app/services/model/faq.model';

export const getUrlFromTag = (questionTag: Tag, tagConfigs: ITagConfigItem[]): string => R.pipe(
    R.find(R.propEq(questionTag)),
    R.prop('url'),
)(tagConfigs)
