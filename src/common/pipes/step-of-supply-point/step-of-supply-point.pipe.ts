import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { StepOfSupplyPoint } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'stepOfSupplyPoint',
})
export class StepOfSupplyPointPipe implements PipeTransform {

    private static readonly SUPPLY_POINT_STATE_TO_TEXT = {
        [StepOfSupplyPoint.CREATE]: '1/3 Vytvoření odběrného místa',
        [StepOfSupplyPoint.CHOOSE_OFFER]: '2/3 Volba nabídky',
        [StepOfSupplyPoint.PERSONAL_INFO]: '2/3 Vyplnění osobních informací',
        [StepOfSupplyPoint.CONTRACT]: '2/3 Podepsání smlouvy',
        [StepOfSupplyPoint.PAYMENT]: '2/3 Platba',
        [StepOfSupplyPoint.COMPLETED]: '3/3 Dokončeno',
    };

    transform(stepOfSupplyPoint: StepOfSupplyPoint): string {
        return StepOfSupplyPointPipe.SUPPLY_POINT_STATE_TO_TEXT[stepOfSupplyPoint] || '';
    }
}
