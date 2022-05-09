import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SecuringYourDataComponent } from './securing-your-data.component';
import { SecuringYourDataRoutingModule } from './securing-your-data.routing';

@NgModule({
    declarations: [SecuringYourDataComponent],
    imports: [
        CommonModule,
        LayoutContainerModule,
        SecuringYourDataRoutingModule,
    ],
})
export class SecuringYourDataModule {}
