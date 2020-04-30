import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import { IQuestion, ITagConfigItem } from 'src/app/services/model/faq.model';

@Pipe({
    name: 'questionsToAccordions',
})
export class QuestionsToAccordionItemsPipe implements PipeTransform {
    transform(questions: IQuestion[], tag: ITagConfigItem): IAccordionItem[] {
        return R.map((question: IQuestion) => ({
            label: question.header,
            data: question.shortContent,
            isActive: false,
        }), questions);
    }
}
