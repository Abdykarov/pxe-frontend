import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ListOfNotificationsModule } from 'src/common/ui/list-of-notifications/list-of-notifications.module';
import { ListOfNotificationsComponent } from './page';

@NgModule({
    declarations: [ListOfNotificationsComponent],
    exports: [ListOfNotificationsComponent],
    imports: [CommonModule, ListOfNotificationsModule],
})
export class ListOfNotificationsPageModule {}

export const listOfNotificationsPageRoutes: Routes = [
    {
        path: 'list-of-notifications',
        component: ListOfNotificationsComponent,
        data: {
            isPublic: false,
        },
    },
];
