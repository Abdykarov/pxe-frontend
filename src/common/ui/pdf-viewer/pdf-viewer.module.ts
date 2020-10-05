import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { PdfViewerComponent } from 'src/common/ui/pdf-viewer/pdf-viewer.component';

@NgModule({
    declarations: [
        PdfViewerComponent,
    ],
    exports: [
        PdfViewerComponent,
    ],
    imports: [
        CommonModule,
        PdfJsViewerModule,
    ],
})
export class PdfViewerModule {}
