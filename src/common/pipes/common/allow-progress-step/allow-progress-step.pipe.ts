import { Pipe, PipeTransform } from '@angular/core';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { NavigateConsumerService } from 'src/common/services/navigate-consumer.service';

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
