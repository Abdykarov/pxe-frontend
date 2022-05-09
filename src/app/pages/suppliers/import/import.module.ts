import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';

@NgModule({
    declarations: [ImportComponent],
    imports: [CommonModule, LayoutContainerModule, ImportRoutingModule],
})
export class ImportModule {}
