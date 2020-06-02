import * as R from 'ramda';

import {
    ITagConfigItem,
    Tag,
} from 'src/app/services/model/faq.model';

export const geParamFromTag = (questionTag: Tag, tagConfigs: ITagConfigItem[], param: string): string => R.pipe(
    R.find(R.propEq('type')(questionTag)),
    R.prop(param),
)(tagConfigs);
