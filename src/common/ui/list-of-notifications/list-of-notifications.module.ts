import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListOfNotificationsComponent } from './list-of-notifications.component';

@NgModule({
    declarations: [ListOfNotificationsComponent],
    imports: [CommonModule],
    exports: [ListOfNotificationsComponent],
})
export class ListOfNotificationsModule {}
