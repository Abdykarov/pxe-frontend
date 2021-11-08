import { Injectable } from '@angular/core';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { getConfigStepper } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class NewSupplyPointPageConfig {
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(
        ProgressStatus.SUPPLY_POINT
    );
}
