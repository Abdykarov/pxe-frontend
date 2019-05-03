import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
    ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
    BsDatepickerConfig,
    BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { csLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { getErrorMessage } from 'src/common/utils';
import { defaultDatepickerConfig } from './datepicker.config';
import { IValidationMessages } from '../models/validation-messages.model';

const locale = 'cs';

@Component({
    selector: 'lnd-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DatepickerComponent {
    @ViewChild('datepicker')
    public datepicker: ElementRef;

    @Output()
    public appendButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public appendButtonIcon?: string;

    @Input()
    public config: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

    @Input()
    public datepickerName: string;

    @Input()
    public disabledField = false;

    @Input()
    public error?: any;

    @Input()
    public id: string;

    @Input()
    public label: string;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public placeholder: string;

    @Input()
    public success = false;

    @Input()
    public touched = false;

    @Input()
    public validationMessages?: IValidationMessages;

    @Input()
    public warning = false;

    public minDate: Date;
    public maxDate: Date;

    constructor(
        private localeService: BsLocaleService,
    ) {
        csLocale.invalidDate = '';
        defineLocale(locale, csLocale);
        this.localeService.use(locale);
        this.config = defaultDatepickerConfig;
        // this.minDate = new Date();
        // this.maxDate = new Date();
    }

    public getErrorMessage = () => getErrorMessage(this.error, this.validationMessages);
}
