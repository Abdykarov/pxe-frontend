import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PdfViewerComponent } from 'src/common/containers/pdf-viewer/pdf-viewer.component';


@NgModule({
    declarations: [
        PdfViewerComponent,
    ],
    exports: [
        PdfViewerComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class PdfViewerModule {}
