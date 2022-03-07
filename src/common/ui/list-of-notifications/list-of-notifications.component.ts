import { Component, Input, TemplateRef } from '@angular/core';
import { TypeOfList } from 'src/common/ui/list-of-notifications/models/list-of-notifications.model';

@Component({
    selector: 'pxe-list-of-notifications',
    templateUrl: './list-of-notifications.component.html',
    styleUrls: ['./list-of-notifications.component.scss'],
})
export class ListOfNotificationsComponent {
    @Input()
    public headerTemplate?: TemplateRef<any>;

    @Input()
    public customColClass = 'col-10 offset-1';

    @Input()
    public customLinkClass = '';

    @Input()
    public customRowClass = 'pb-5';

    @Input()
    public emptyNotifications = 'Žádná hláška není k dispozici.';

    @Input()
    public headerText: string;

    @Input()
    public maxShowNotifications = 50;

    @Input()
    public notifications: string[];

    @Input()
    public type = TypeOfList.NUMBER;

    public TypeOfList = TypeOfList;
}
