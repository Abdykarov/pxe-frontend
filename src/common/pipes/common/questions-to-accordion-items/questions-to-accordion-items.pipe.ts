import { Pipe, PipeTransform } from '@angular/core';
import * as R from 'ramda';
import { CONSTS } from 'src/app/app.constants';
import { IQuestion, ITagConfigItem } from 'src/app/services/model/faq.model';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';

@Pipe({
    name: 'questionsToAccordions',
})
export class QuestionsToAccordionItemsPipe implements PipeTransform {
    transform(
        questions: IQuestion[],
        tagConfigs: ITagConfigItem[]
    ): IAccordionItem[] {
        return R.map(
            (question: IQuestion) => ({
                label: question.header,
                data: question,
                isActive: false,
                url: `/${CONSTS.PATHS.FAQ}/${R.head(question.tag).url}/${
                    question.url
                }`,
            }),
            questions
        );
    }
}
