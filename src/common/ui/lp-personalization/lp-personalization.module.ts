import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { BasicComponent } from './basic/basic.component';

@NgModule({
    imports: [ButtonModule, CommonModule],
    declarations: [BasicComponent],
    exports: [BasicComponent],
})
export class LpPersonalizationModule {}
