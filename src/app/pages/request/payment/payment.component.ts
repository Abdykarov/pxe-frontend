import {
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { getConfigStepper } from 'src/common/utils';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-contract',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends AbstractComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.WAITING_FOR_PAYMENT;

    public configStepper = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public globalError: string[] = [];
}
