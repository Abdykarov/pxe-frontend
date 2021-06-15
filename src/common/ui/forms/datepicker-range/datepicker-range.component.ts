import {
    ChangeDetectorRef,
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

import { DynamicPipe } from 'src/common/pipes/common/dynamic/dynamic.pipe';
import { getErrorMessage } from 'src/common/utils';
import { defaultDatepickerConfig } from './datepicker-range.config';
import { IValidationMessages } from '../models/validation-messages.model';

const locale = 'cs';

@Component({
    selector: 'lnd-datepicker-range',
    templateUrl: './datepicker-range.component.html',
    styleUrls: ['./datepicker-range.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DatepickerRangeComponent {
    @ViewChild('datepicker', { static: true })
    public datepicker: any;

    @Output()
    public appendButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public appendButtonIcon?: string;

    @Output()
    public blur?: EventEmitter<any> = new EventEmitter();

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
    public minDate?: Date;

    @Input()
    public maxDate?: Date;

    public inputFocused = false;

    constructor(
        private cd: ChangeDetectorRef,
        private dynamicPipe: DynamicPipe,
        private localeService: BsLocaleService,
    ) {
        this.resetDatepickerLocale();
        this.config = defaultDatepickerConfig;
    }

    public resetDatepickerLocale = (invalidMessage = '') => {
        csLocale.invalidDate = invalidMessage;
        defineLocale(locale, csLocale);
        this.localeService.use(locale);
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

    public onHidePicker = (event) => this.cd.markForCheck();

    public getErrorMessage = () => getErrorMessage(this.error, this.validationMessages, this.dynamicPipe);
}
