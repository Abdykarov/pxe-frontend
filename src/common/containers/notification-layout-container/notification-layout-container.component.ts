import {
    Component,
    Input,
} from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-notification-layout-container',
    templateUrl: './notification-layout-container.component.html',
    styleUrls: ['./notification-layout-container.component.scss'],
})
export class NotificationLayoutContainerComponent {
    @Input()
    public title;

    @Input()
    public breadcrumbItemsSimple: IBreadcrumbItems;
}
