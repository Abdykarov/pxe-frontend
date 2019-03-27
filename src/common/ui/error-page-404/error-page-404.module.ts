import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPage404Component } from './error-page-404.component';

@NgModule({
    declarations: [
        ErrorPage404Component,
    ],
    exports: [
        ErrorPage404Component,
    ],
    imports: [
        CommonModule,
    ],
})
export class ErrorPage404Module {}
