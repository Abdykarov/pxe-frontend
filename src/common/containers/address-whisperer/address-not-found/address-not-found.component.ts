import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { FieldComponent } from 'src/common/ui/forms/field/field.component';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { REGIONS } from 'src/app/app.constants';

@Component({
    selector: 'pxe-address-not-found',
    templateUrl: './address-not-found.component.html',
    styleUrls: ['./address-not-found.component.scss'],
})
export class AddressNotFoundComponent extends AbstractComponent implements OnDestroy, OnInit {

    private _cityInput: FieldComponent;

    @ViewChild('cityInput')
    set cityInput(cityInput: FieldComponent) {
        this._cityInput = cityInput;
        if (this._cityInput) {
            setTimeout(() => this._cityInput.triggerFocus = 'TRIG', 0);
        }
    }

    @Input()
    public formFields: IForm;

    @Input()
    public nameOfTemporaryWhisererFormGroup: string;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public whispererName: string;

    @Output()
    public sendValidAddressAction: EventEmitter<any> = new EventEmitter();

    public regionOptions: Array<IOption> = REGIONS;

    public form: FormGroup;

    ngOnInit() {
        super.ngOnInit();
        this.parentForm.get(this.whispererName)
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe(() => {
                if (this.parentForm.get(this.whispererName).valid) {
                    this.sendValidAddressAction.emit(this.parentForm.get(this.whispererName).value);
                }
            });
    }

    ngOnDestroy() {
        this.parentForm.removeControl( this.whispererName);
    }
}
