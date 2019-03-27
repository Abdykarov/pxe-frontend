import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// own components
import { BannerUIComponent } from './banner-ui.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [
        BannerUIComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
    ],
    exports: [
        BannerUIComponent,
    ],
})
export class BannerUIModule {}
