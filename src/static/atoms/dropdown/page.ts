import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IDropdownItem } from 'src/common/ui/dropdown/models/item.model';

@Component({
  templateUrl: './page.html',
})

export class DropdownPageComponent {
    public dropdownItems: Array<IDropdownItem>;
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.dropdownItems = [];
        const item1 = <IDropdownItem>{
                label: 'Dropdown item 1 (very long text visible in the item)',
                action: () => console.log('Click on dropdown item 1'),
            };
        const item2 = <IDropdownItem>{
                label: 'Dropdown item 2',
                action: () => console.log('Click on dropdown item 2'),
            };

        this.dropdownItems.push(item1);
        this.dropdownItems.push(item2);
        this.dropdownItems.push(item2);
        this.dropdownItems.push(item2);
        this.dropdownItems.push(item2);

        this.breadcrumbItemsSimple = [
            {
                label: 'Drop*',
                url: null,
            },
        ];
    }
}
