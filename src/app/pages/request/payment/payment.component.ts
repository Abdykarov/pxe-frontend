import {
    Component,
    OnInit,
} from '@angular/core';
import { AbstractComponent } from 'src/common/abstract.component';
import { configStepper } from './payment.config';

@Component({
    selector: 'pxe-contract',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends AbstractComponent implements OnInit {
    public configStepper = configStepper;
    public globalError: string[] = [];
}
