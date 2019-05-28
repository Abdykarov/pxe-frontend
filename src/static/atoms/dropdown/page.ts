import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IDropdownItem } from 'src/common/ui/dropdown/models/item.model';

@Component({
  templateUrl: './page.html',
})

export class DropdownPageComponent {
    public dropdownItems: Array<IDropdownItem>;
    private body = document.getElementById('top');
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public toggleOverlayer() {
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-full');
    }

    constructor() {
        this.dropdownItems = [];
        const item1 = <IDropdownItem> {
            label: 'Profil uživatele',
            icon: 'user',
            action: () => console.log('Click on dropdown item 1'),
        };
        const item2 = <IDropdownItem> {
            label: 'Změna hesla',
            icon: 'lock-close',
            action: () => console.log('Click on dropdown item 2'),
        };
        const item3 = <IDropdownItem> {
            class: 'link--logout',
            label: 'Odhlášení',
            icon: 'power',
            action: () => console.log('Odhlášeno'),
        };

        this.dropdownItems.push(item1);
        this.dropdownItems.push(item2);
        this.dropdownItems.push(item3);

        this.breadcrumbItemsSimple = [
            {
                label: 'Dropdown',
                url: null,
            },
        ];
    }
}
