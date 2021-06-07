import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/common/pipes.module';

// own components
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { LogoutInformationComponent } from './logout-information.component';

@NgModule({
    declarations: [
        LogoutInformationComponent,
    ],
    imports: [
        BannerUIModule,
        CommonModule,
        PipesModule,
    ],
    exports: [
        LogoutInformationComponent,
    ],
})
export class LogoutInformationModule {}
