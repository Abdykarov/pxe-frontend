import {
    Component,
    Input,
} from '@angular/core';

import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
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

    public bannerObj: IBannerObj = {
        linkValue: '#',
        text: 'Vaše heslo bylo úspěšně změněno.',
        linkType: '',
        title: '',
    };

    constructor() {
        this.showBanner = window.history.state.showBanner;
    }
}
