import {
    Component, EventEmitter,
    OnChanges,
    OnInit, Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { REGIONS } from 'src/app/app.constants';

@Component({
    selector: 'pxe-address-whisperer-by-hand-form',
    templateUrl: './address-whisperer-by-hand-form.component.html',
    styleUrls: ['./address-whisperer-by-hand-form.component.scss'],
})
export class AddressWhispererByHandFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    @Output()
    public sendDataIfValidAction: EventEmitter<any> = new EventEmitter();

    public form: FormGroup;
    public regions: any;

    public regionOptions = REGIONS;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.form = this.fb.group(this.formFields.controls, this.formFields.options);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.formSent && changes.formSent.currentValue && this.form) {
            const defaultValues = R.map(R.head, this.formFields.controls);
            this.form.reset(defaultValues);
            this.resetFormError();
        }
    }

    isValid = () => {
        if ( this.form.valid) {
            this.sendDataIfValidAction.emit(this.form.value);
        }
    }
}
