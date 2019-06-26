import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { SupplyPointState } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'supplyPointState',
})
export class SupplyPointStatePipe implements PipeTransform {

    private static readonly SUPPLY_POINT_STATE_TO_TEXT = {
        [SupplyPointState.CREATE]: '1/3 Vytvoření odběrného místa',
        [SupplyPointState.CHOOSE_OFFER]: '2/3 Volba nabídky',
        [SupplyPointState.PERSONAL_INFO]: '2/3 Vyplnění osobních informací',
        [SupplyPointState.CONTRACT]: '2/3 Podepsání smlouvy',
        [SupplyPointState.PAYMENT]: '2/3 Platba',
        [SupplyPointState.COMPLETED]: '3/3 Dokončeno',
    };

    transform(supplyPointState: SupplyPointState): string {
        return SupplyPointStatePipe.SUPPLY_POINT_STATE_TO_TEXT[supplyPointState];
    }
}
