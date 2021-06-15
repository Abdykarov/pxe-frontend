import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// own components
import { InfoBannerComponent } from './info-banner.component';
import { ButtonModule } from '../button/button.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';

@NgModule({
    declarations: [
        InfoBannerComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        PipesModule,
    ],
    exports: [
        InfoBannerComponent,
    ],
})
export class InfoBannerModule {}
