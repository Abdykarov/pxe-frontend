import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import {
    ICodelistItem,
    ProgressStatus,
    SubjectType,
} from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'progressStatus',
})
export class ProgressStatusPipe implements PipeTransform {

    private static readonly SUPPLY_POINT_STATE_TO_TEXT = {
        [ProgressStatus.SUPPLY_POINT]: () => '1/3 Vytvoření odběrného místa',
        [ProgressStatus.OFFER_STEP]: () => '2/3 Volba nabídky',
        [ProgressStatus.PERSONAL_DATA]:
            (subjectTypeCode: SubjectType = SubjectType.SUBJECT_TYPE_INDIVIDUAL) =>
                (subjectTypeCode === SubjectType.SUBJECT_TYPE_INDIVIDUAL) ? '2/3 Vyplnění osobních údajů' : '2/3 Vyplnění firemních údajů',
        [ProgressStatus.READY_FOR_SIGN]: () => '2/3 Podepsání smlouvy',
        [ProgressStatus.WAITING_FOR_PAYMENT]: () => '2/3 Platba',
        [ProgressStatus.COMPLETED]: () => '3/3 Dokončeno',
    };

    transform(progressStatus: ProgressStatus, subjectType: ICodelistItem = null): string {
        let resultText = '';
        const getProgressStatusText = ProgressStatusPipe.SUPPLY_POINT_STATE_TO_TEXT[progressStatus];
        if (getProgressStatusText) {
            resultText = getProgressStatusText(subjectType ? <SubjectType>subjectType.code : null);
        }
        return resultText;
    }
}
