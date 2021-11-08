import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
// own components
import { BannerUIComponent } from './banner-ui.component';

@NgModule({
    declarations: [BannerUIComponent],
    imports: [ButtonModule, CommonModule],
    exports: [BannerUIComponent],
})
export class BannerUIModule {}
