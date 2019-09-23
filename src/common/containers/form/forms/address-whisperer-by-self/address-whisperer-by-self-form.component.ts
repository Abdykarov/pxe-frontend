import {
    Component,
    EventEmitter, Input,
    OnChanges,
    OnInit, Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { REGIONS } from 'src/app/app.constants';
import { ValidateAddressWhispererService } from 'src/app/services/validate.address-whisperer.service';

@Component({
    selector: 'pxe-address-whisperer-by-self-form',
    templateUrl: './address-whisperer-by-self-form.component.html',
    styleUrls: ['./address-whisperer-by-self-form.component.scss'],
})
export class AddressWhispererBySelfFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    @Input()
    public showForm;

    @Output()
    public sendDataIfValidAction: EventEmitter<any> = new EventEmitter();

    public form: FormGroup;

    public regionOptions: Array<IOption> = REGIONS;

    constructor(
        protected fb: FormBuilder,
        private validateAddressWhispererService: ValidateAddressWhispererService,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.form = this.fb.group(this.formFields.controls, this.formFields.options);
        this.validateAddressWhispererService.validateBySelfForms$
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe(() => {
                this.resetCustomFieldError();
                this.triggerValidation();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.showForm && changes.showForm.currentValue && this.form) {
            const defaultValues = R.map(R.head, this.formFields.controls);
            this.form.reset(defaultValues);
            this.resetFormError();
        }

        // if (changes.showForm && changes.showForm.currentValue === true) {
        //     console.log('OK');
        // }
    }

    changedForm = () => {
        this.resetCustomFieldError();
        this.isValid();
    }

    isValid = () => {
        if ( this.form.valid) {
            this.sendDataIfValidAction.emit(this.form.value);
        }
    }
}
