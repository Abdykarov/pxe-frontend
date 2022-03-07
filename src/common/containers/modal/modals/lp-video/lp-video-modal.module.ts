import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';
import { LpVideoModalComponent } from './lp-video-modal.component';

@NgModule({
    declarations: [LpVideoModalComponent],
    imports: [ButtonModule, CommonModule, DirectivesModule, ModalModule],
    exports: [LpVideoModalComponent],
})
export class LpVideoModalModule {}
