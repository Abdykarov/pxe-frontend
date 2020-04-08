import {
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-layout-container',
    templateUrl: './layout-container.component.html',
    styleUrls: ['./layout-container.component.scss'],
})
export class LayoutContainerComponent {

    @Input()
    public breadcrumbItemsSimple: IBreadcrumbItems;

    @Input()
    public pageTitle: string;

    public showBanner = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.showBanner = window.history.state.showBanner;
        }
    }
}
