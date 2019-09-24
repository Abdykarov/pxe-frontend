import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {
    FormGroup, Validators,
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
    addressWhispererBySelfFields,
} from 'src/common/containers/form/forms/address-whisperer-by-self/address-whisperer-by-self-form.config';
import { AddressWhispererService } from './services/address-whisperer.service';
import { IAddress } from 'src/common/graphql/models/supply.model';
import { IValidationMessages } from 'src/common/ui/forms/models/validation-messages.model';
import { SelectComponent } from 'src/common/ui/forms/select/select.component';

@Component({
    selector: 'pxe-address-whisperer',
    templateUrl: './address-whisperer.component.html',
    styleUrls: ['./address-whisperer.component.scss'],
})
export class AddressWhispererComponent extends AbstractComponent implements OnInit {
    private static readonly ADDRESS_MIN_LENGTH = 2;
    private static readonly DEBOUNCE_TIME = 200;
    private static readonly ROWS_RESPONSE = 5;

    private static readonly PATTER_START_SEARCHING = /^([a-z]+[ ,]+[0-9]+.*)|([0-9]+[ ,]+[a-z]+.*)$/;

    public END_NAME_OF_FORM = 'by_self123';

    @ViewChild('lndSelect')
    public lndSelect: SelectComponent;

    @Output()
    public appendButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public appendButtonIcon?: string;

    @Input()
    public disabled = false;

    @Input()
    public error?: any;

    @Input()
    public formFields = addressWhispererBySelfFields;

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
    public templateNotFoundFillBySelf: TemplateRef<any>;

    @Input()
    public templateNotFoundFewArguments?: TemplateRef<any>;

    @Input()
    public touched = false;

    @Input()
    public subtext?: string;

    @Input()
    public subtextTemplate?: TemplateRef<any>;

    @Input()
    public success = false;

    @Input()
    public validationMessages?: IValidationMessages;

    @Input()
    public whispererName: string;

    @Output()
    public userFillingAddressBySelfAction: EventEmitter<any> = new EventEmitter<any>();

    private showForm = false;
    public addresses: Array<IAddress> = [];
    public typeahead: EventEmitter<any>;
    public isStartedSearching = false;
    public term = '';

    public hasTermGoodLength = term => term && term.length >= AddressWhispererComponent.ADDRESS_MIN_LENGTH;

    constructor(
        private cd: ChangeDetectorRef,
        private addressWhispererService: AddressWhispererService,
    ) {
        super();
        this.typeahead = new EventEmitter();

        this.typeahead
            .pipe(
                debounceTime(AddressWhispererComponent.DEBOUNCE_TIME),
                tap((term) => {
                    this.term = term;
                    if ( !this.hasTermGoodLength(term)) {
                        this.isStartedSearching = !!AddressWhispererComponent.PATTER_START_SEARCHING.exec(term);
                        this.showForm = false;
                        this.setAddressValidator(true);
                        this.cd.markForCheck();
                    }
                }),
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
        this.isStartedSearching = !!AddressWhispererComponent.PATTER_START_SEARCHING.exec(this.term);
        this.addresses = addresses;
        this.showForm = false;
        this.setAddressValidator(true);
        this.cd.markForCheck();
    }

    public setAddressValidator = (required: boolean) => {
        this.parentForm.get(this.whispererName)
            .setValidators(required ? [Validators.required] : []);
        this.parentForm.get(this.whispererName).markAsUntouched({
            onlySelf: true,
        });
    }

    public fillAddressBySelf = (evt) => {
        this.lndSelect.hideDialog();
        this.showForm = true;
        this.setAddressValidator(false);
        this.userFillingAddressBySelfAction.emit(this.showForm);
        this.cd.markForCheck();
    }

    public fillAddressWhispererIfIsValid = (value) => {
        this.showForm = false;
        this.setAddressValidator(true);
        this.parentForm.get(this.whispererName).setValue(value);
        this.userFillingAddressBySelfAction.emit(this.showForm);
    }
}
