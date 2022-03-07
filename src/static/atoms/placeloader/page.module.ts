import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
// own classes
import { PlaceloaderPageComponent } from './page';

@NgModule({
    declarations: [PlaceloaderPageComponent],
    exports: [PlaceloaderPageComponent],
    imports: [BreadcrumbModule, CommonModule, PlaceloaderModule],
})
export class PlaceloaderPageModule {}

export const placeloaderPageRoutes: Routes = [
    {
        path: 'placeloader',
        component: PlaceloaderPageComponent,
    },
];
