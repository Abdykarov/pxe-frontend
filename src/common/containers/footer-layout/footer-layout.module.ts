import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { FooterLayoutComponent } from './footer-layout.component';

@NgModule({
    declarations: [
        FooterLayoutComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
    ],
    exports: [
        FooterLayoutComponent,
    ],
})
export class FooterLayoutModule { }
