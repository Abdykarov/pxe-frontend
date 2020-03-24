import {
    Component,
    Input,
} from '@angular/core';

@Component({
    selector: 'pxe-list-of-notifications',
    templateUrl: './list-of-notifications.component.html',
    styleUrls: ['./list-of-notifications.component.scss'],
})
export class ListOfNotificationsComponent {
    @Input()
    public maxShowNotifications = 50;

    @Input()
    public headerText: string;

    @Input()
    public notifications: string[];

    @Input()
    public emptyNotifications = 'Žádná hláška není k dispozici.';
}
