import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IDropdownItem } from 'src/common/ui/dropdown/models/item.model';

@Component({
  templateUrl: './page.html',
})

export class FormsPageComponent {
    public dropdownItems: Array<IDropdownItem>;
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public options = [
        {
            key: 'one',
            value: 'one',
        },
        {
            key: 2,
            value: 'second',
        },
        {
            key: 3,
            value: 3,
        },
    ];

    constructor() {
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
