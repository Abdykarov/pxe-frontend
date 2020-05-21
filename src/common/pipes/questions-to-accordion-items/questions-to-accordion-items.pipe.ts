import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { geParamFromTag } from 'src/common/utils';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import {
    IQuestion,
    ITagConfigItem,
} from 'src/app/services/model/faq.model';

@Pipe({
    name: 'questionsToAccordions',
})
export class QuestionsToAccordionItemsPipe implements PipeTransform {
    transform(questions: IQuestion[], tagConfigs: ITagConfigItem[]): IAccordionItem[] {
        return R.map((question: IQuestion) => ({
            label: question.header,
            data: question,
            isActive: false,
            url: `/faq/${geParamFromTag(question.tag, tagConfigs, 'url')}/${question.url}`,
        }), questions);
    }
}
