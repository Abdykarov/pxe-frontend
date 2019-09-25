import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { FieldComponent } from 'src/common/ui/forms/field/field.component';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { REGIONS } from 'src/app/app.constants';

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
    public sendValidAddressAction: EventEmitter<any> = new EventEmitter();

    public regionOptions: Array<IOption> = REGIONS;

    public addedControls = false;

    public form: FormGroup;

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
                    this.sendValidAddressAction.emit(this.parentForm.get(this.whispererName).value);
                    this.addedControls = false;
                    this.parentForm.removeControl( this.whispererName);
                }
            });
    }

    ngOnDestroy() {
        this.addedControls = false;
        this.parentForm.removeControl( this.whispererName);
        super.ngOnDestroy();
    }
}
