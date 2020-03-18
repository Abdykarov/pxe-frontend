import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImportComponent } from './import.component';
import { ImportRoutingModule } from './import-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        ImportComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        ImportRoutingModule,
    ],
})
export class ImportModule { }
