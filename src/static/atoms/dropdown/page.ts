import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    INavigationItem,
    INavigationMenu,
} from 'src/common/ui/navigation/models/navigation.model';

@Component({
    templateUrl: './page.html',
})
export class DropdownPageComponent {
    public navigationItems: INavigationMenu = [];

    private body = document.getElementById('top');
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public toggleOverlayer() {
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-aside');
    }

    constructor() {
        this.navigationItems = [];
        const item1: INavigationItem = {
            label: 'Profil uživatele',
            icon: 'user',
            url: '/basic/dropdown',
        };
        const item2: INavigationItem = {
            label: 'Změna hesla',
            icon: 'lock-close',
            url: '/basic/dropdown',
        };
        const item3: INavigationItem = {
            class: 'link--logout',
            icon: 'power',
            label: 'Odhlášení',
            url: '/basic/dropdown',
        };

        this.navigationItems.push(item1);
        this.navigationItems.push(item2);
        this.navigationItems.push(item3);

        this.breadcrumbItemsSimple = [
            {
                label: 'Dropdown',
                url: null,
            },
        ];
    }
}
