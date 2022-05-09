import { Component } from '@angular/core';
import { listOfNotifications } from './config';

@Component({
    templateUrl: './page.html',
})
export class ListOfNotificationsComponent {
    public listOfNotificationsConfig = listOfNotifications;
}
