import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import {
    getConfigStepperByStatus,
    getSupplyPointState,
} from 'src/common/utils/get-progress-stepper-config.fnc';
import {
    ISupplyPoint,
    SupplyPointState,
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

    public supplyPointState: SupplyPointState;
    public stepperProgressConfig: IStepperProgressItem[] = null;

    ngOnInit(): void {
        this.supplyPointState = getSupplyPointState(this.supplyPoint);
        this.stepperProgressConfig = getConfigStepperByStatus(this.supplyPointState);
    }
}
