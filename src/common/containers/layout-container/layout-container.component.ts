import {
    Component,
    Input,
} from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-layout-container',
    templateUrl: './layout-container.component.html',
    styleUrls: ['./layout-container.component.scss'],
})
export class LayoutContainerComponent {
    @Input()
    public pageTitle;

    @Input()
    public breadcrumbItemsSimple: IBreadcrumbItems;
}
