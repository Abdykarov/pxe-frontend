import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { CardPageComponent } from './page';

// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { CardModule } from 'src/common/ui/card/card.module';

@NgModule({
    declarations: [
        CardPageComponent,
    ],
    exports: [
        CardPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CardModule,
        CommonModule,
    ],
})
export class CardPageModule {}

export const cardPageRoutes: Routes = [
    {
        path: 'card',
        component: CardPageComponent,
    },
];
