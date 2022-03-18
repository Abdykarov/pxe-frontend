import { Pipe, PipeTransform } from '@angular/core';
import { NavigateConsumerService } from 'src/app/services/navigate-consumer.service';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'allowProgressStep',
})
export class AllowProgressStepPipe implements PipeTransform {
    constructor(private navigateConsumerService: NavigateConsumerService) {}

    transform(
        supplyPoint: ISupplyPoint,
        progressStatus: ProgressStatus
    ): boolean {
        if (!supplyPoint || !progressStatus) {
            return false;
        }
        return this.navigateConsumerService.canGoToStep(
            supplyPoint,
            progressStatus
        );
    }
}
