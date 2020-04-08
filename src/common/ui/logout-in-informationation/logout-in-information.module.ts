import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/pipes.module';

// own components
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { LogoutInInformationComponent } from './logout-in-information.component';

@NgModule({
    declarations: [
        LogoutInInformationComponent,
    ],
    imports: [
        BannerUIModule,
        CommonModule,
        PipesModule,
    ],
    exports: [
        LogoutInInformationComponent,
    ],
})
export class LogoutInInformationModule {}
