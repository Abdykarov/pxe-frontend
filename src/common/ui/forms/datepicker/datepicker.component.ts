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

    constructor(
        private localeService: BsLocaleService,
    ) {
        csLocale.invalidDate = '';
        defineLocale(locale, csLocale);
        this.localeService.use(locale);
        this.config = defaultDatepickerConfig;
    }

    public checkValue = (event) => {
        const stringDate = event.target.value;
        const dateFormatRegexp = new RegExp(defaultDatepickerConfig.dateFormatRegexp);
        if (dateFormatRegexp.test(stringDate)) {
            const match = stringDate.match(dateFormatRegexp);
            const date = Date.parse(`${match[3]}-${match[2]}-${match[1]}`);
            if (date) {
                this.datepicker.bsValue = new Date(date);
            } else {
                // IE walkaround
                this.datepicker.bsValue = null;
                this.datepicker.bsValue = undefined;
                this.parentForm.controls[this.datepickerName].setErrors({
                    'bsDate': true,
                });
                this.datepicker.isOpen = false;
            }
        }
    }

    public onShowPicker = (event) => {
        const dayHoverHandler = event.dayHoverHandler;
        const hoverWrapper = (hoverEvent) => {
            const { cell, isHovered } = hoverEvent;

            if ((isHovered &&
                !!navigator.platform &&
                /iPad|iPhone|iPod/.test(navigator.platform)) &&
                'ontouchstart' in window
            ) {
                this.datepicker._datepickerRef.instance.daySelectHandler(cell);
            }

            return dayHoverHandler(hoverEvent);
        };
        event.dayHoverHandler = hoverWrapper;
    }

    public getErrorMessage = () => getErrorMessage(this.error, this.validationMessages);
}
