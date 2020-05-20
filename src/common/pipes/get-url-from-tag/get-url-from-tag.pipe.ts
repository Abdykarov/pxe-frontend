import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { getUrlFromTag } from 'src/common/utils';
import {
    ITagConfigItem,
    Tag,
} from 'src/app/services/model/faq.model';

@Pipe({
    name: 'getUrlFromTag',
})
export class GetUrlFromTagPipe implements PipeTransform {
    transform(questionTag: Tag, tagConfigs: ITagConfigItem[]): string {
        return getUrlFromTag(questionTag, tagConfigs);
    }
}
