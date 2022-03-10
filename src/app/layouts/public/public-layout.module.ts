import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'src/common/containers/modal/modal.module';
import { ReCaptchaModule } from 'src/common/containers/re-captcha/re-captcha.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { PublicLayoutComponent } from './public-layout.component';
import { PublicLayoutRoutingModule } from './public-layout.routing';

@NgModule({
    declarations: [PublicLayoutComponent],
    imports: [
        ButtonModule,
        CommonModule,
        FooterModule,
        HeaderModule,
        ModalModule,
        PipesModule,
        ReCaptchaModule,
        PublicLayoutRoutingModule,
    ],
})
export class PublicLayoutModule {}
