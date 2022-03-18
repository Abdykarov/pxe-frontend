import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { TabsModule } from 'src/common/ui/tabs/tabs.module';
import { TabsPageComponent } from './page';

@NgModule({
    declarations: [TabsPageComponent],
    exports: [TabsPageComponent],
    imports: [BreadcrumbModule, CommonModule, TabsModule],
})
export class TabsPageModule {}

export const tabsPageRoutes: Routes = [
    {
        path: 'tabs',
        component: TabsPageComponent,
    },
];
