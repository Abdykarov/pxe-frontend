import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { AdvancedTablesPageComponent } from './advanced/page';
import { BasicTablesPageComponent } from './basic/page';

// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DropdownModule } from 'src/common/ui/dropdown/dropdown.module';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        AdvancedTablesPageComponent,
        BasicTablesPageComponent,
    ],
    exports: [
        AdvancedTablesPageComponent,
        BasicTablesPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        DropdownModule,
        TableModule,
    ],
})
export class TablesPageModule {}

export const tablesPageRoutes: Routes = [
    {
        path: 'tables-basic',
        component: BasicTablesPageComponent,
    },
    {
        path: 'tables-advanced',
        component: AdvancedTablesPageComponent,
    },
];
