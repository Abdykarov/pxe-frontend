import {
    Pipe,
    PipeTransform,
} from '@angular/core';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';

@Pipe({
    name: 'allowProgressStep',
})
export class AllowProgressStepPipe implements PipeTransform {

    constructor(private navigateRequestService: NavigateRequestService) {}

    transform(supplyPoint: ISupplyPoint, progressStatus: ProgressStatus): boolean {
        if (!supplyPoint || !progressStatus) {
            return false;
        }
        return this.navigateRequestService.canGoToStep(supplyPoint, progressStatus);
    }
}
