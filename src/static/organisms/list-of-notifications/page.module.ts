import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { ListOfNotificationsComponent } from './page';
import { ListOfNotificationsModule } from 'src/common/ui/list-of-notifications/list-of-notifications.module';

@NgModule({
    declarations: [
        ListOfNotificationsComponent,
    ],
    exports: [
        ListOfNotificationsComponent,
    ],
    imports: [
        CommonModule,
        ListOfNotificationsModule,
    ],
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
