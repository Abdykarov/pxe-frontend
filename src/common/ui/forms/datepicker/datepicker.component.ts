import {
    Component,
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

    refresh(event) {
        const stringDate = event.target.value;
        const DATE_FORMAT_REGEXP = new RegExp('^\\d\\d[.]\\d\\d[.]\\d\\d\\d\\d$');
        if (DATE_FORMAT_REGEXP.test(event.target.value)) {
            const date = Date.parse(stringDate.substr(6, 4) + '-' + (stringDate.substr(3, 2)) + '-' + (stringDate.substr(0, 2)));
            if (date) {
                this.datepicker.bsValue = new Date(date);
            } else {
                this.datepicker.bsValue = null;
                this.parentForm.controls[this.datepickerName].setErrors({
                    'pattern': true,
                });
                this.parentForm.updateValueAndValidity();
            }
        }
    }

    onShowPicker(event) {
        const dayHoverHandler = event.dayHoverHandler;
        const hoverWrapper = (hoverEvent) => {
            const { cell, isHovered } = hoverEvent;

            if ((isHovered &&
                !!navigator.platform &&
                /iPad|iPhone|iPod/.test(navigator.platform)) &&
                'ontouchstart' in window
            ) {
                (this.datepicker as any)._datepickerRef.instance.daySelectHandler(cell);
            }

            return dayHoverHandler(hoverEvent);
        };
        event.dayHoverHandler = hoverWrapper;
    }

    constructor(
        private localeService: BsLocaleService,
    ) {
        csLocale.invalidDate = '';
        defineLocale(locale, csLocale);
        this.localeService.use(locale);
        this.config = defaultDatepickerConfig;
    }

    public getErrorMessage = () => getErrorMessage(this.error, this.validationMessages);
}
