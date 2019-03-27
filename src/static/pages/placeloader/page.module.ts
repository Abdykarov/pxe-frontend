import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { PlaceloaderPageComponent } from './page';

// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';

@NgModule({
    declarations: [
        PlaceloaderPageComponent,
    ],
    exports: [
        PlaceloaderPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        PlaceloaderModule,
    ],
})
export class PlaceloaderPageModule {}

export const placeloaderPageRoutes: Routes = [
    {
        path: 'placeloader',
        component: PlaceloaderPageComponent,
    },
];
