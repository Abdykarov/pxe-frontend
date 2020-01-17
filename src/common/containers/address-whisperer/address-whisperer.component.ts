import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    switchMap,
    tap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    addressNotFoundFields,
} from 'src/common/containers/address-whisperer/address-not-found/address-not-found.config';
import { AddressWhispererService } from './services/address-whisperer.service';
import { CustomValidators } from 'src/common/utils';
import { IAddress } from 'src/common/graphql/models/supply.model';
import { IValidationMessages } from 'src/common/ui/forms/models/validation-messages.model';
import { SelectComponent } from 'src/common/ui/forms/select/select.component';

@Component({
    selector: 'pxe-address-whisperer',
    templateUrl: './address-whisperer.component.html',
    styleUrls: ['./address-whisperer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddressWhispererComponent extends AbstractComponent implements OnInit {
    private static readonly ADDRESS_MIN_LENGTH = 2;
    private static readonly DEBOUNCE_TIME = 200;
    private static readonly ROWS_RESPONSE = 5;

    private static readonly PATTER_START_SEARCHING =
        new RegExp('^(.*?[' + CustomValidators.alphaCharacters + '].*?[ ,].*?[0-9].*?)|' +
            '(.*?[0-9].*?[ ,].*?[' + CustomValidators.alphaCharacters + '].*?)$');

    public static readonly UNIQUE_FIELD_NAME_END = '_not_found_unique';

    @ViewChild('lndSelect')
    public lndSelect: SelectComponent;

    @ViewChild('selectWrapper')
    public lndSelectWrapper: ElementRef;

    @Output()
    public appendButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public appendButtonIcon?: string;

    @Input()
    public disabled = false;

    @Input()
    public error?: any;

    @Input()
    public formFields = addressNotFoundFields;

    @Input()
    public formFieldsParentForm = null;

    @Input()
    public label: string;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public placeholder: string;

    @Input()
    public templateItem?: TemplateRef<any>;

    @Input()
    public templateLabel?: TemplateRef<any>;

    @Input()
    public templateNotFound?: TemplateRef<any>;

    @Input()
    public touched = false;

    @Input()
    public useApmForm = false;

    @Input()
    public subtext?: string;

    @Input()
    public addressSubtextTemplate?: TemplateRef<any>;

    @Input()
    public subtextTemplate?: TemplateRef<any>;

    @Input()
    public success = false;

    @Input()
    public validationMessages?: IValidationMessages;

    @Input()
    public whispererName: string;

    public addresses: Array<IAddress> = [];
    public typeahead: EventEmitter<any>;
    public isStartedSearching = false;
    public term = '';
    public nameOfTemporaryWhispererFormGroup = '';

    private _showForm = false;

    set showForm(showForm: boolean) {
        // delete v not-found kvuli disable
        if (showForm) {
            this.parentForm.addControl(
                this.nameOfTemporaryWhispererFormGroup,
                this.fb.group(this.formFields.controls, this.formFields.options),
            );
        }

        this._showForm = showForm;
    }

    get showForm() {
        return this._showForm;
    }

    public hasTermGoodLength = term => term && term.length >= AddressWhispererComponent.ADDRESS_MIN_LENGTH;

    constructor(
        private cd: ChangeDetectorRef,
        private addressWhispererService: AddressWhispererService,
        private fb: FormBuilder,
    ) {
        super();
        this.typeahead = new EventEmitter();

        this.typeahead
            .pipe(
                tap((term) => {
                    this.term = term;
                    if (this.hasTermGoodLength(this.term) && !!AddressWhispererComponent.PATTER_START_SEARCHING.exec(this.term)) {
                        this.isStartedSearching = false;
                    } else {
                        this.isStartedSearching = !!AddressWhispererComponent.PATTER_START_SEARCHING.exec(this.term);
                    }
                    this.showForm = false;
                    this.setAddressValidator(true);
                }),
                debounceTime(AddressWhispererComponent.DEBOUNCE_TIME),
                filter(this.hasTermGoodLength),
                distinctUntilChanged(),
                switchMap((term: string) => this.addressWhispererService.getPlaces(AddressWhispererComponent.ROWS_RESPONSE, term)),
                takeUntil(this.destroy$),
            )
            .subscribe((addresses: Array<IAddress>)  => {
                this.setAddresses(addresses);
            }, (err) => {
                this.setAddresses();
            });
    }

    ngOnInit() {
        super.ngOnInit();
        this.nameOfTemporaryWhispererFormGroup = this.whispererName + AddressWhispererComponent.UNIQUE_FIELD_NAME_END;
    }

    public setAddresses = (addresses = []) => {
        this.isStartedSearching = !!AddressWhispererComponent.PATTER_START_SEARCHING.exec(this.term);
        this.addresses = addresses;
        this.cd.markForCheck();
    }

    public setAddressValidator = (required: boolean) => {
        if (this.formFieldsParentForm) {
            let updatedValidators =  this.formFieldsParentForm.controls[this.whispererName][1];
            if (!required) {
                updatedValidators = R.omit(['required'], updatedValidators);
            }
            this.parentForm.controls[this.whispererName].setValidators(updatedValidators);
            this.parentForm.get(this.whispererName).markAsUntouched({
                onlySelf: true,
            });
        }
    }

    public fillAddressBySelf = (evt) => {
        this.setAddressValidator(false);
        this.lndSelect.hideDialog();
        this.showForm = true;
        this.cd.markForCheck();
    }

    public sendValidAddress = (value) => {
        this.parentForm.get(this.whispererName).setValue(value);
        this.cd.markForCheck();
    }
}
