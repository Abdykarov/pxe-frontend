import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { FieldComponent } from 'src/common/ui/forms/field/field.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { REGIONS } from 'src/app/app.constants';

@Component({
    selector: 'pxe-address-not-found',
    templateUrl: './address-not-found.component.html',
    styleUrls: ['./address-not-found.component.scss'],
})
export class AddressNotFoundComponent extends AbstractFormComponent implements OnDestroy, OnInit {

    private _cityInput: FieldComponent;

    @ViewChild('cityInput')
    set cityInput(cityInput: FieldComponent) {
        this._cityInput = cityInput;
        if (this._cityInput) {
            setTimeout(() => this._cityInput.triggerFocus = 'TRIG');
        }
    }

    @Input()
    public nameOfTemporaryWhispererFormGroup: string;

    @Input()
    public parentForm: any;

    @Input()
    public whispererName: string;

    @Output()
    public sendValidAddressAction: EventEmitter<any> = new EventEmitter();

    public regionOptions: Array<IOption> = REGIONS;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        this.parentForm.get(this.whispererName)
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                if (this.parentForm.get(this.whispererName).valid) {
                    this.sendValidAddressAction.emit(this.parentForm.get(this.whispererName).value);
                }
            });
    }

    ngOnDestroy() {
        this.parentForm.removeControl(this.whispererName);
    }
}
