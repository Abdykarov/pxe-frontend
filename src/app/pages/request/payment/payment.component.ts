import {
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { getConfigStepperByState } from 'src/common/utils/get-progress-stepper-config.fnc';
import { SupplyPointState } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-contract',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends AbstractComponent implements OnInit {
    public configStepper = getConfigStepperByState(SupplyPointState.PAYMENT);
    public globalError: string[] = [];
}
