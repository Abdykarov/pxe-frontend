import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { FormsPageConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class FormsPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public datepickers: FormGroup = new FormGroup({
        datepicker: new FormControl('', [Validators.required]),
        errorDatepicker: new FormControl(''),
        disabledDatepicker: new FormControl(''),
    });

    public selectBoxes: FormGroup = new FormGroup({
        simpleSelect: new FormControl(),
        searchableSelect: new FormControl(),
        errorSelect: new FormControl(),
    });

    public addressWhisperer: FormGroup = new FormGroup({
        address: new FormControl(),
    });

    constructor(public config: FormsPageConfig) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Forms',
                url: null,
            },
        ];
    }

    public clickAction = () => alert('CLICK');

    public trigger = () => alert('Help icon works!');
}
