import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { ButtonModule } from '../button/button.module';
// own components
import { InfoBannerComponent } from './info-banner.component';

@NgModule({
    declarations: [InfoBannerComponent],
    imports: [ButtonModule, CommonModule, PipesModule],
    exports: [InfoBannerComponent],
})
export class InfoBannerModule {}
