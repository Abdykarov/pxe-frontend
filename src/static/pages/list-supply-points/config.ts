import { Injectable } from '@angular/core';

import { getConfigStepper } from 'src/common/utils';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class NewSupplyPointPageConfig {
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(ProgressStatus.SUPPLY_POINT);
}

