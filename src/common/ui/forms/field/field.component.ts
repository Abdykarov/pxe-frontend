import {
    AfterContentInit,
    Component,
    ChangeDetectorRef,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

import * as R from 'ramda';

import { DynamicPipe } from 'src/common/pipes/common/dynamic/dynamic.pipe';
import { FieldTypes } from '../models/field-types.model';
import { getErrorMessage } from 'src/common/utils';
import { IOption } from '../models/option.model';
import { IValidationMessages } from '../models/validation-messages.model';

@Component({
    selector: 'lnd-form-field',
    templateUrl: 'field.component.html',
    styleUrls: ['./field.component.scss'],
    encapsulation: ViewEncapsulation.None,
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
    public autocomplete = 'off';

    @Output()
    public blur?: EventEmitter<any> = new EventEmitter();

    @Input()
    public customFieldClass?: string;

    @Input()
    public customFormGroupClass?: string;

    @Input()
    public  customTypeClass?: string;

    @Input()
    public defaultRadioGroupValue?: IOption;

    @Input()
    public disabledField = false;

    @Input()
    public error?: any;

    @Output()
    public focus?: EventEmitter<any> = new EventEmitter();

    @Input()
    public hideLabel = false;

    @Input()
    public checked = false;

    @Input()
    public id: string;

    @Input()
    public infoText = '';

    @Input()
    public inlineLabel = false;

    @Input()
    public lightField = false;

    @Input()
    public radioGroupClass?: string;

    @Input()
    public radioGroupItemClass?: string;

    @Input()
    public label = '';

    @Input()
    public labelTemplate?: TemplateRef<any>;

    @Input()
    public name?: string;

    @Input()
    public maxlength?: string;

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
    public showErrorMessage = true;

    @Input()
    public subtext?: string;

    @Input()
    public subtextTemplate?: TemplateRef<any>;

    @Input()
    public success = false;

    @Input()
    public switch = false;

    @Input()
    public touched = false;

    @Input()
    set triggerFocus(value: any) {
        if (this.field && !!value) {
            setTimeout(() => {
                this.field.nativeElement.focus();
            });
        }
    }

    @Input()
    public type: string = FieldTypes.INPUT;

    @Input()
    public validationMessages?: IValidationMessages;

    @Input()
    public warning = false;

    @Input()
    public inputFocused = false;

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
        private dynamicPipe: DynamicPipe,
    ) {}

    ngAfterContentInit() {
        this.name = !!this.name ? this.name : this.id;
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

    public trim = (): void => this.value = R.trim(this._value || '');

    public focusAction = (evt): void => {
        this.inputFocused = true;
        this.focus.emit(evt);
    }

    public blurAction = (evt, withTrim = false): void => {
        this.inputFocused = false;
        this.blur.emit(evt);
        if ( withTrim) {
            this.trim();
        }
    }

    public getErrorMessage = () => getErrorMessage(this.error, this.validationMessages, this.dynamicPipe);
}
