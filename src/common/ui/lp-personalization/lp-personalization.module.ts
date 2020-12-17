import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasicComponent } from './basic/basic.component';
import { ButtonModule } from 'src/common/ui/button/button.module';

@NgModule({
    imports: [
        ButtonModule,
        CommonModule,
    ],
    declarations: [
        BasicComponent,
    ],
    exports: [
        BasicComponent,
    ],
})
export class LpPersonalizationModule {}
