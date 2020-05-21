import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { geParamFromTag } from 'src/common/utils';
import {
    ITagConfigItem,
    Tag,
} from 'src/app/services/model/faq.model';

@Pipe({
    name: 'getUrlFromTag',
})
export class GetUrlFromTagPipe implements PipeTransform {
    transform(questionTag: Tag, tagConfigs: ITagConfigItem[]): string {
        return geParamFromTag(questionTag, tagConfigs, 'url');
    }
}
