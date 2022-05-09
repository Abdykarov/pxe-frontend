import { isPlatformBrowser } from '@angular/common';
import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { REGIONS } from 'src/app/app.constants';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { FieldComponent } from 'src/common/ui/forms/field/field.component';
import { IOption } from 'src/common/ui/forms/models/option.model';

@Component({
    selector: 'pxe-address-not-found',
    templateUrl: './address-not-found.component.html',
    styleUrls: ['./address-not-found.component.scss'],
})
export class AddressNotFoundComponent
    extends AbstractFormComponent
    implements OnDestroy, OnInit
{
    private _cityInput: FieldComponent;

    @ViewChild('cityInput', { static: true })
    set cityInput(cityInput: FieldComponent) {
        this._cityInput = cityInput;
        if (this._cityInput) {
            setTimeout(() => {
                if (isPlatformBrowser(this.platformId) && this.withFocus) {
                    const firstInputWithoutValue: HTMLInputElement =
                        document.querySelector(
                            `.${this.whispererName} input:not(.form-control--not-empty)`
                        );
                    if (firstInputWithoutValue) {
                        firstInputWithoutValue.focus();
                    }
                }
            });
        }
    }

    @Input()
    public parentForm: any;

    @Input()
    public withFocus = true;

    @Input()
    public whispererName: string;

    @Output()
    public sendValidAddressAction: EventEmitter<any> = new EventEmitter();

    public regionOptions: Array<IOption> = REGIONS;

    constructor(
        protected fb: FormBuilder,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        super(fb);
    }

    ngOnInit() {
        this.parentForm
            .get(this.whispererName)
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this.parentForm.get(this.whispererName).valid) {
                    this.sendValidAddressAction.emit(
                        this.parentForm.get(this.whispererName).value
                    );
                }
            });
    }

    ngOnDestroy() {
        this.parentForm.removeControl(this.whispererName);
    }
}
