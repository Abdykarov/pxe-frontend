import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IDropdownItem } from 'src/common/ui/dropdown/models/item.model';
import { FormsPageConfig } from './config';

@Component({
  templateUrl: './page.html',
})

export class FormsPageComponent {
    public dropdownItems: Array<IDropdownItem>;
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public datepickers: FormGroup = new FormGroup({
        datepicker: new FormControl(''),
    });

    constructor(
        public config: FormsPageConfig,
    ) {
        this.dropdownItems = [];
        const item1 = <IDropdownItem>{
                label: 'FOO',
                action: () => console.log('Click on dropdown item 1'),
            };
        const item2 = <IDropdownItem>{
                label: 'BAR',
                action: () => console.log('Click on dropdown item 2'),
            };

        this.dropdownItems.push(item1);
        this.dropdownItems.push(item2);

        this.breadcrumbItemsSimple = [
            {
                label: 'Forms',
                url: null,
            },
        ];
    }

    public clickAction = () => {
        alert('CLICK');
    }
}
