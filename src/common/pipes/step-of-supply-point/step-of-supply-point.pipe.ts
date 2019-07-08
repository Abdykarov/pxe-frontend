import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { ProgressStatus } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'progressStatus',
})
export class ProgressStatusPipe implements PipeTransform {

    private static readonly SUPPLY_POINT_STATE_TO_TEXT = {
        [ProgressStatus.SUPPLY_POINT]: '1/3 Vytvoření odběrného místa',
        [ProgressStatus.OFFER_STEP]: '2/3 Volba nabídky',
        [ProgressStatus.PERSONAL_DATA]: '2/3 Vyplnění osobních informací',
        [ProgressStatus.READY_FOR_SIGN]: '2/3 Podepsání smlouvy',
        [ProgressStatus.WAITING_FOR_PAYMENT]: '2/3 Platba',
        [ProgressStatus.COMPLETED]: '3/3 Dokončeno',
    };

    transform(progressStatus: ProgressStatus): string {
        return ProgressStatusPipe.SUPPLY_POINT_STATE_TO_TEXT[progressStatus] || '';
    }
}
