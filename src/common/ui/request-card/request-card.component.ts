import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import {
    getConfigStepper,
    getStepOfSupplyPoint,
} from 'src/common/utils/get-progress-stepper-config.fnc';
import {
    ISupplyPoint,
    StepOfSupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Component({
    selector: 'pxe-request-card',
    templateUrl: './request-card.component.html',
    styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {

    @Input()
    public supplyPoint: ISupplyPoint;

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    public stepOfSupplyPoint: StepOfSupplyPoint;
    public stepperProgressConfig: IStepperProgressItem[] = null;

    ngOnInit(): void {
        this.stepOfSupplyPoint = getStepOfSupplyPoint(this.supplyPoint);
        this.stepperProgressConfig = getConfigStepper(this.stepOfSupplyPoint);
    }
}
