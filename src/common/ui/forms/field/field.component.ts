import {
    AfterContentInit,
    Component,
    ChangeDetectorRef,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { createStringFromTemplate } from 'src/common/utils';
import { ErrorMessages } from '../form.constants';
import { FieldTypes } from '../models/field-types.model';
import { IOption } from '../models/option.model';
import { IValidationMessages } from '../models/validation-messages.model';

@Component({
    selector: 'lnd-form-field',
    templateUrl: 'field.component.html',
    styleUrls: ['./field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FieldComponent),
            multi: true,
        },
    ],
})
export class FieldComponent implements AfterContentInit, ControlValueAccessor {
    @ViewChild('field')
    public field: ElementRef;

    // tslint:disable-next-line:no-input-rename
    @Input('value')
    private _value = '';

    @Output()
    public appendButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public appendButtonIcon?: string;

    @Input()
    public appendIcon?: string;

    @Input()
    public appendText?: string;

    @Input()
    public autocomplete?: string;

    @Output()
    public blur?: EventEmitter<any> = new EventEmitter();

    @Input()
    public customFieldClass?: string;

    @Input()
    public customFormGroupClass?: string;

    @Input()
    public defaultRadioGroupValue?: IOption;

    @Input()
    public disabledField = false;

    @Input()
    public lightField = false;

    @Input()
    public error?: any;

    @Input()
    public hideLabel = false;

    @Input()
    public checked = false;

    @Input()
    public id: string;

    @Input()
    public inlineLabel = false;

    @Input()
    public radioGroupClass?: string;

    @Input()
    public radioGroupItemClass?: string;

    @Input()
    public label = '';

    @Input()
    public name?: string;

    @Input()
    public options?: Array<IOption>;

    @Input()
    public placeholder = '';

    @Output()
    public prependButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public prependButtonIcon?: string;

    @Input()
    public prependIcon?: string;

    @Input()
    public prependText?: string;

    @Input()
    public readonly = false;

    @Input()
    public required = false;

    @Input()
    public rows = 3;

    @Input()
    public subtext?: string;

    @Input()
    public success = false;

    @Input()
    public switch = false;

    @Input()
    public touched = false;

    @Input()
    public type: string = FieldTypes.INPUT;

    @Input()
    public validationMessages?: IValidationMessages;

    @Input()
    public warning = false;

    onChange: any = () => {};
    onTouched: any = () => {};

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    constructor(
        private cd: ChangeDetectorRef,
    ) {}

    ngAfterContentInit() {
        this.name = !!this.name ? this.name : this.id;
        this.placeholder = !!this.placeholder ? this.placeholder : this.label;
        this.cd.markForCheck();

        if (!!this.defaultRadioGroupValue) {
            this.changeRadioGroupAction(this.defaultRadioGroupValue);
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value) {
        if (!R.isNil(value)) {
            this.value = value;
        }
    }

    public changeSelect = (event) => {
        this.writeValue(event.target.value);
    }

    public changeRadioAction = () => {
        this.checked = true;
        this.writeValue(this.checked);
    }

    public changeRadioGroupAction = (value) => {
        this.writeValue(value);
    }

    public labelClick = (value = null) => {
        this.field.nativeElement.focus();

        switch (this.type) {
            case FieldTypes.FILE:
                this.field.nativeElement.click();
                break;
            case FieldTypes.RADIOGROUP:
            case FieldTypes.TOGGLE:
                this.changeRadioGroupAction(value);
                break;
        }
    }

    public getErrorMessage = () => {
        if (R.isNil(this.error)) {
            return;
        }

        if (R_.isString(this.error)) {
            return this.error;
        }

        if (R_.isObject(this.error)) {
            const errorType = Object.keys(this.error)[0];
            const message = this.validationMessages && this.validationMessages[errorType] || ErrorMessages[errorType];
            return createStringFromTemplate(
                message || errorType,
                this.error[errorType],
            );
        }
    }
}
