import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { csLocale } from 'ngx-bootstrap/locale';
import { DynamicPipe } from 'src/common/pipes/common/dynamic/dynamic.pipe';
import { getErrorMessage } from 'src/common/utils';
import { IValidationMessages } from '../models/validation-messages.model';
import { defaultDatepickerConfig } from './datepicker.config';

const locale = 'cs';

@Component({
    selector: 'lnd-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DatepickerComponent {
    @ViewChild('datepicker', { static: true })
    public datepicker: any;

    @Output()
    public appendButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public appendButtonIcon?: string;

    @Output()
    public blur?: EventEmitter<any> = new EventEmitter();

    @Output()
    public change?: EventEmitter<any> = new EventEmitter();

    @Output()
    public hide?: EventEmitter<any> = new EventEmitter();

    @Input()
    public config: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

    @Input()
    public datepickerName: string;

    @Input()
    public disabledField = false;

    @Input()
    public error?: any;

    @Output()
    public focus?: EventEmitter<any> = new EventEmitter();

    @Input()
    public id: string;

    @Input()
    public label: string;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public placeholder: string;

    @Input()
    public showErrorMessage = true;

    @Input()
    public success = false;

    @Input()
    public touched = false;

    @Input()
    public validationMessages?: IValidationMessages;

    @Input()
    public warning = false;

    @Input()
    public minDate?: Date = null;

    @Input()
    public maxDate?: Date = null;

    public inputFocused = false;

    constructor(
        private cd: ChangeDetectorRef,
        private dynamicPipe: DynamicPipe,
        private localeService: BsLocaleService
    ) {
        this.resetDatepickerLocale();
        this.config = defaultDatepickerConfig;
    }

    public checkValue = (event) => {
        const stringDate = event.target.value;
        const dateFormatRegexp = new RegExp(
            defaultDatepickerConfig.dateFormatRegexp
        );
        if (dateFormatRegexp.test(stringDate)) {
            const match = stringDate.match(dateFormatRegexp);
            const date = Date.parse(`${match[3]}-${match[2]}-${match[1]}`);
            if (date) {
                this.datepicker.bsValue = new Date(date);
            } else {
                this.resetDatepickerOnError(stringDate);
            }
        } else {
            this.resetDatepickerOnError(stringDate);
        }
    };

    public resetDatepickerLocale = (invalidMessage = '') => {
        csLocale.invalidDate = invalidMessage;
        defineLocale(locale, csLocale);
        this.localeService.use(locale);
    };

    public resetDatepickerOnError = (value: string) => {
        this.resetDatepickerLocale(value);
        // IE walkaround
        // this.datepicker.bsValue = null;
        // this.datepicker.bsValue = undefined;
        this.parentForm.controls[this.datepickerName].setErrors({
            bsDate: true,
        });
        this.datepicker.isOpen = false;
    };

    public onShowPicker = (event) => {
        const dayHoverHandler = event.dayHoverHandler;
        const hoverWrapper = (hoverEvent) => {
            const { cell, isHovered } = hoverEvent;

            if (
                isHovered &&
                !!navigator.platform &&
                /iPad|iPhone|iPod/.test(navigator.platform) &&
                'ontouchstart' in window
            ) {
                this.datepicker._datepickerRef.instance.daySelectHandler(cell);
            }

            return dayHoverHandler(hoverEvent);
        };
        event.dayHoverHandler = hoverWrapper;
        setTimeout(() => {
            window.scrollTo(window.scrollX, window.scrollY - 1);
            window.scrollTo(window.scrollX, window.scrollY + 1);
        });
    };

    public onHidePicker = (event) => this.cd.markForCheck();

    public getErrorMessage = () =>
        getErrorMessage(this.error, this.validationMessages, this.dynamicPipe);
}
