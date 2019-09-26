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
    Validators,
} from '@angular/forms';

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

    public readonly UNIQUE_FIELD_NAME_END = '_not_found' + new Date().toTimeString();

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
    public subtext?: string;

    @Input()
    public checkboxTemplate?: TemplateRef<any>;

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
    public nameOfTemporaryWhisererFormGroup = this.whispererName + this.UNIQUE_FIELD_NAME_END;

    private _showForm = false;

    set showForm(showForm: boolean) {
        showForm ? this.parentForm.addControl(
                this.nameOfTemporaryWhisererFormGroup,
                this.fb.group(this.formFields.controls, this.formFields.options),
            ) :
            this.parentForm.removeControl( this.nameOfTemporaryWhisererFormGroup);
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
                    if (this.hasTermGoodLength(term) && this.isStartedSearching) {
                        this.showForm = false;
                        this.setAddressValidator(true);
                        this.cd.markForCheck();
                    }
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

    public setAddresses = (addresses = []) => {
        console.log('VOLAM SET ADDRESS');
        this.addresses = addresses;
        this.isStartedSearching = !!AddressWhispererComponent.PATTER_START_SEARCHING.exec(this.term);
        this.showForm = false;
        this.setAddressValidator(true);
        this.cd.markForCheck();
    }

    public setAddressValidator = (required: boolean) => {
        console.log('setAddressValidator' + required + '__');
        this.parentForm.get(this.whispererName)
            .setValidators(required ? [Validators.required] : []);
        this.parentForm.get(this.whispererName).markAsUntouched({
            onlySelf: true,
        });
    }

    public fillAddressBySelf = (evt) => {
        console.log('FILLADDRESS');
        this.setAddressValidator(false);
        console.log(this.parentForm);
        this.lndSelect.hideDialog();
        this.showForm = true;
        this.cd.markForCheck();
    }

    public sendValidAddress = (value) => {
        this.parentForm.get(this.whispererName).setValue(value);
        this.cd.markForCheck();
    }

    public onBlur(evt) {
        this.setAddressValidator(false);
    }
}
