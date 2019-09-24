import {
    Component, ElementRef,
    EventEmitter, Input,
    OnChanges,
    OnInit, Output,
    SimpleChanges, ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { FieldComponent } from 'src/common/ui/forms/field/field.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { REGIONS } from 'src/app/app.constants';
import { ValidateAddressWhispererService } from 'src/app/services/validate.address-whisperer.service';

@Component({
    selector: 'pxe-address-whisperer-by-self-form',
    templateUrl: './address-whisperer-by-self-form.component.html',
    styleUrls: ['./address-whisperer-by-self-form.component.scss'],
})
// je zde potreba abstract from component
export class AddressWhispererBySelfFormComponent extends AbstractFormComponent implements OnInit, OnChanges {


    private _cityInput: FieldComponent;

    @ViewChild('cityInput')
    set cityInput(cityInput: FieldComponent) {
        this._cityInput = cityInput;
        if (this._cityInput) {
            this._cityInput.triggerFocus = 'TRIG';
        }
    }

    @Input()
    public showForm;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public whispererName: string;

    @Output()
    public sendDataIfValidAction: EventEmitter<any> = new EventEmitter();

    public form: FormGroup;

    public subscription: any;

    public regionOptions: Array<IOption> = REGIONS;

    constructor(
        protected fb: FormBuilder,
        private validateAddressWhispererService: ValidateAddressWhispererService,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();

        this.validateAddressWhispererService.submitFormSubjects$
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe(() => {
                this.resetCustomFieldError();
                this.triggerValidation();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.showForm && changes.showForm.currentValue === true) {
            this.parentForm.addControl( this.whispererName, this.fb.group(this.formFields.controls, this.formFields.options));

            this.subscription = this.parentForm.get(this.whispererName)
                .valueChanges
                .pipe(
                    takeUntil(this.destroy$),
                ).subscribe(() => {
                    if ( this.parentForm.get(this.whispererName).valid) {
                        this.sendDataIfValidAction.emit(this.parentForm.get(this.whispererName).value);
                        this.parentForm.removeControl( this.whispererName);
                        this.subscription.unsubscribe();
                    }
                });
        }

        if ( changes.showForm.currentValue === false) {
            this.parentForm.removeControl( this.whispererName);
        }
    }
}
