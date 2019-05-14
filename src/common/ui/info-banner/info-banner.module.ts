import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// own components
import { InfoBannerComponent } from './info-banner.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [
        InfoBannerComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
    ],
    exports: [
        InfoBannerComponent,
    ],
})
export class InfoBannerModule {}
