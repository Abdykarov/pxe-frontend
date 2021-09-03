import {
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as R from 'ramda';
import {
    NgSelectComponent,
    NgSelectConfig,
} from '@ng-select/ng-select';

import { defaultSelectConfig } from './select.config';
import { DynamicPipe } from 'src/common/pipes/common/dynamic/dynamic.pipe';
import {
    getErrorMessage,
    normalizeString,
} from 'src/common/utils';
import { IOption } from '../models/option.model';
import { IValidationMessages } from '../models/validation-messages.model';

@Component({
    selector: 'lnd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {

    @ViewChild('select', { static: true })
    private select: NgSelectComponent;

    @Output()
    public appendButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public addTag = false;

    @Input()
    public appendButtonIcon?: string;

    @Input()
    public bindValue = 'key';

    @Output()
    public blur?: EventEmitter<any> = new EventEmitter();

    @Input()
    public clearable = true;

    @Input()
    public disabledField = false;

    @Output()
    public change?: EventEmitter<any> = new EventEmitter();

    @Output()
    public close?: EventEmitter<any> = new EventEmitter();

    @Output()
    public open?: EventEmitter<any> = new EventEmitter();

    @Output()
    public remove?: EventEmitter<any> = new EventEmitter();

    @Input()
    public customClass?: string;

    @Input()
    public error?: any;

    @Output()
    public focus?: EventEmitter<any> = new EventEmitter();

    @Input()
    public inputFocused = false;

    @Input()
    public label?: string;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public showErrorMessage = true;

    @Input()
    public selectName: string;

    @Input()
    public options?: Array<IOption>;

    @Input()
    public placeholder = 'Vyberte';

    @Input()
    public searchable = false;

    @Input()
    public subtext?: string;

    @Input()
    public success = false;

    @Input()
    public touched = false;

    @Input()
    public subtextTemplate?: TemplateRef<any>;

    @Input()
    public templateItem?: TemplateRef<any>;

    @Input()
    public templateLabel?: TemplateRef<any>;

    @Input()
    public templateNotFound?: TemplateRef<any>;

    @Input()
    public typeahead?: EventEmitter<any>;

    @Input()
    public withoutConditionalAtLength = true;

    @Input()
    public validationMessages?: IValidationMessages;

    @Input()
    public warning?: any;

    constructor(
        private config: NgSelectConfig,
        private dynamicPipe: DynamicPipe,
    ) {
        R.pipe(
            R.keys,
            R.map(key => {
                this.config[key] = defaultSelectConfig[key];
            }),
        )(defaultSelectConfig);
    }

    public customSearchFn = (term: string, item: any) => {
        if (this.withoutConditionalAtLength || !!term && term.length > 2) {
            const label = R.path(['label'], item);
            if (label) {
                const normalizationTerm = normalizeString(term);
                const normalizationItem = normalizeString(label);
                return normalizationItem.indexOf(normalizationTerm) > -1;
            } else {
                return false;
            }
        }
    }

    public getErrorMessage = () => getErrorMessage(this.error, this.validationMessages, this.dynamicPipe);

    public hideDialog = () => {
        this.select.close();
        setTimeout(() => {
            window.scrollTo(window.scrollX, window.scrollY - 1);
            window.scrollTo(window.scrollX, window.scrollY + 1);
        });
    }
}
