import { Injectable } from '@angular/core';
import * as R from 'ramda';
import {
    ISupplyPointStatisticView,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { NavigateConsumerService } from 'src/common/services/navigate-consumer.service';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointUtilsService {
    constructor(public navigateConsumerService: NavigateConsumerService) {}

    public completeRequestAction = (
        notConcludedItems: ISupplyPointStatisticView[]
    ) => {
        R.cond([
            [
                (items: ISupplyPointStatisticView[]) =>
                    R.equals(1, items.length),
                (items: ISupplyPointStatisticView[]) => {
                    const notConcludedItem = items[0];
                    this.navigateConsumerService.routerToRequestStep(
                        notConcludedItem,
                        ProgressStatus.SUPPLY_POINT
                    );
                },
            ],
            [R.T, () => this.navigateConsumerService.navigateToRequests()],
        ])(notConcludedItems);
    };
}
