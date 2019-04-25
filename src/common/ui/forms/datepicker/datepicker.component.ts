import {
    Component,
    ElementRef,
    ChangeDetectorRef,
    Input,
    ViewEncapsulation,
    ViewChild,
} from '@angular/core';
import {
    BsDatepickerConfig,
    BsLocaleService,
} from 'ngx-bootstrap/datepicker';

import * as R from 'ramda';
import { csLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { createStringFromTemplate } from 'src/common/utils';
import { defaultDatepickerConfig } from './datepicker.config';
import { ErrorMessages } from '../form.constants';

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

    @Input()
    public config: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

    @Input()
    public datepickerName: string;

    @Input()
    public id: string;

    @Input()
    public label: string;

    @Input()
    public parentForm;

    @Input()
    public placeholder: string;

    public minDate: Date;
    public maxDate: Date;

    constructor(
        private cd: ChangeDetectorRef,
        private localeService: BsLocaleService,
    ) {
        csLocale.invalidDate = '';
        defineLocale(locale, csLocale);
        this.localeService.use(locale);
        this.config = defaultDatepickerConfig;
        // this.minDate = new Date();
        // this.maxDate = new Date();
    }

    public getErrorMessage = (error) => {
        if (R.isNil(error)) {
            return;
        }

        if (typeof error === 'object') {
            const errorType = Object.keys(error)[0];
            return createStringFromTemplate(
                ErrorMessages[errorType],
                error[errorType],
            );
        }
    }
}
