import { Pipe, PipeTransform } from '@angular/core';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'allowProgressStep',
})
export class AllowProgressStepPipe implements PipeTransform {
    constructor(private navigateRequestService: NavigateRequestService) {}

    transform(
        supplyPoint: ISupplyPoint,
        progressStatus: ProgressStatus
    ): boolean {
        if (!supplyPoint || !progressStatus) {
            return false;
        }
        return this.navigateRequestService.canGoToStep(
            supplyPoint,
            progressStatus
        );
    }
}
