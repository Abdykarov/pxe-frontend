import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { methodOfPaymentOfAdvances } from './personal-info-form.config';

@Component({
    selector: 'pxe-personal-info-form',
    templateUrl: './personal-info-form.component.html',
    styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public headerText = 'Osobní informace';

    public methodOfPaymentOfAdvances = methodOfPaymentOfAdvances;

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();

        this.form.get('onlyPermanentAddress')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.setCorrespondenceAddress(val);
            });

        this.setCorrespondenceAddress(false);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public setCorrespondenceAddress(val) {
        const correspondenceAddress = this.form.get('correspondenceAddress');
        if (val) {
            correspondenceAddress.enable();
        } else {
            correspondenceAddress.disable();
        }
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            this.submitAction.emit(this.form);
        }
    }
}
