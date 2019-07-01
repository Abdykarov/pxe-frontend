import {
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { getConfigStepper } from 'src/common/utils/get-progress-stepper-config.fnc';
import { StepOfSupplyPoint } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-contract',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends AbstractComponent implements OnInit {
    public configStepper = getConfigStepper(StepOfSupplyPoint.PAYMENT);
    public globalError: string[] = [];
}
