import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import { getConfigStepper } from 'src/common/utils/get-progress-stepper-config.fnc';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

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

    public stepperProgressConfig: IStepperProgressItem[] = null;

    ngOnInit(): void {
        this.stepperProgressConfig = getConfigStepper(this.supplyPoint.progressStatus);
    }
}
