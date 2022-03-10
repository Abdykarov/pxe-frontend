import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdfViewerComponent } from 'src/common/ui/pdf-viewer/pdf-viewer.component';
import { PdfJsViewerModule } from 'src/third-sides/ng2-pdfjs-viewer/ng2-pdfjs-viewer.module';

@NgModule({
    declarations: [PdfViewerComponent],
    exports: [PdfViewerComponent],
    imports: [CommonModule, PdfJsViewerModule],
})
export class PdfViewerModule {}
