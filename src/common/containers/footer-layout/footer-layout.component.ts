import {
    Component,
    Input,
} from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-layout-footer',
    templateUrl: './footer-layout.component.html',
    styleUrls: ['./footer-layout.component.scss'],
})
export class FooterLayoutComponent {
    @Input()
    public title;

    @Input()
    public breadcrumbItemsSimple: IBreadcrumbItems;
}
