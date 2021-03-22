import {
    Component,
    Inject,
    Input,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from 'src/app/services/auth.service';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ILogoutRequired } from 'src/app/services/model/logout-required.model';

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

    @Input()
    public withHeader = true;

    public showBanner = false;
    public logoutRequired = false;
    public LogoutRequired = ILogoutRequired;

    constructor(
        public authService: AuthService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.showBanner = window.history.state.showBanner;
            this.logoutRequired = window.history.state.logoutRequired;
        }
    }
}
