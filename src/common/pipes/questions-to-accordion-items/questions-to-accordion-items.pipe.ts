import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import { IQuestion } from 'src/app/pages/faq/faq.model';

@Pipe({
    name: 'questionsToAccordions',
})
export class QuestionsToAccordionItemsPipe implements PipeTransform {
    transform(questions: IQuestion[]): IAccordionItem[] {
        return R.map((question: IQuestion) => ({
            label: question.header,
            data: question.shortContent,
            isActive: false,
        }), questions);
    }
}
