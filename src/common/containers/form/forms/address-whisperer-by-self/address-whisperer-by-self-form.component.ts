import {
    Component, ElementRef,
    EventEmitter, Input,
    OnChanges, OnDestroy,
    OnInit, Output,
    SimpleChanges, ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { FieldComponent } from 'src/common/ui/forms/field/field.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { REGIONS } from 'src/app/app.constants';
import { ValidateAddressWhispererService } from 'src/app/services/validate.address-whisperer.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

@Component({
    selector: 'pxe-address-whisperer-by-self-form',
    templateUrl: './address-whisperer-by-self-form.component.html',
    styleUrls: ['./address-whisperer-by-self-form.component.scss'],
})
export class AddressWhispererBySelfFormComponent extends AbstractComponent implements OnDestroy, OnInit {

    private _cityInput: FieldComponent;

    @ViewChild('cityInput')
    set cityInput(cityInput: FieldComponent) {
        this._cityInput = cityInput;
        if (this._cityInput) {
            this._cityInput.triggerFocus = 'TRIG';
        }
    }

    @Input()
    public formFields: IForm;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public whispererName: string;

    @Output()
    public sendDataIfValidAction: EventEmitter<any> = new EventEmitter();

    public regionOptions: Array<IOption> = REGIONS;

    public addedControls = false;

    public form: FormGroup;
    public formError: any = {};

    constructor(
        protected fb: FormBuilder,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.parentForm.addControl( this.whispererName, this.fb.group(this.formFields.controls, this.formFields.options));
        this.addedControls = true;
        this.parentForm.get(this.whispererName)
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe(() => {
                if ( this.parentForm.get(this.whispererName).valid) {
                    this.sendDataIfValidAction.emit(this.parentForm.get(this.whispererName).value);
                    this.addedControls = false;
                    this.parentForm.removeControl( this.whispererName);
                    this.addedControls = false;
                }
            });
    }

    ngOnDestroy() {
        this.addedControls = false;
        this.parentForm.removeControl( this.whispererName);
        this.addedControls = false;
        super.ngOnDestroy();
    }

}
