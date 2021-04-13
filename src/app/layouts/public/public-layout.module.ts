import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecaptchaModule } from 'ng-recaptcha';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { ModalModule } from 'src/common/containers/modal/modal.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PublicLayoutComponent } from './public-layout.component';
import { PublicLayoutRoutingModule } from './public-layout.routing';

@NgModule({
    declarations: [
        PublicLayoutComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        FooterModule,
        HeaderModule,
        ModalModule,
        PipesModule,
        RecaptchaModule,
        PublicLayoutRoutingModule,
    ],
})
export class PublicLayoutModule {}
