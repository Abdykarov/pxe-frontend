import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
    ViewChild, SimpleChanges, OnChanges, ChangeDetectorRef,
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
    public datepicker: any;

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

    @Input()
    public minDate?: Date;

    @Input()
    public maxDate?: Date;

    handle(event) {
        const DATE_FORMAT_REGEXP = new RegExp('^\\d\\d[.]\\d\\d[.]\\d\\d\\d\\d$');
        if (DATE_FORMAT_REGEXP.test(event.target.value)) {
            const stringDate = event.target.value;
            const dddd = new Date();
            dddd.setDate(stringDate.substr(0, 2) + 1 );
            dddd.setMonth(stringDate.substr(3, 2) + 1 );
            dddd.setFullYear(stringDate.substr(6, 4));
            console.log(dddd);
            this.datepicker.bsValue = dddd;
        }
    }

    constructor(
        private localeService: BsLocaleService,
        private cd: ChangeDetectorRef,
    ) {
        csLocale.invalidDate = '';
        defineLocale(locale, csLocale);
        this.localeService.use(locale);
        this.config = defaultDatepickerConfig;
    }

    public getErrorMessage = () => getErrorMessage(this.error, this.validationMessages);
}
