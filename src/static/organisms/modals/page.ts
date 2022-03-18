import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})
export class ModalsPageComponent {
    public isLargeModalOpen: boolean;
    public isModalWithLogoOpen: boolean;
    public isNormalModalOpen: boolean;
    public isConfirmModalOpen: boolean;
    public breadcrumbItemsSimple: IBreadcrumbItems;
    private body = document.getElementById('top');

    public toggleLargeModal = () => {
        this.isLargeModalOpen = !this.isLargeModalOpen;
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-full');
    };

    public toggleModalWithLogo = () => {
        this.isModalWithLogoOpen = !this.isModalWithLogoOpen;
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-full');
    };

    public toggleNormalModal = () => {
        this.isNormalModalOpen = !this.isNormalModalOpen;
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-full');
    };

    public toggleConfirmModal = () => {
        this.isConfirmModalOpen = !this.isConfirmModalOpen;
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-full');
    };

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Modals',
                url: null,
            },
        ];
    }
}
