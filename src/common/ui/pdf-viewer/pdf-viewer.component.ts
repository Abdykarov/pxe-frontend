import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PdfJsViewerComponent } from 'src/third-sides/ng2-pdfjs-viewer/ng2-pdfjs-viewer.component';

@Component({
    selector: 'pxe-pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
    @ViewChild('pdfjsViewer', { static: true, read: ElementRef })
    public pdfjsViewerWrapper: ElementRef;

    @ViewChild('pdfjsViewer', { static: true })
    public pdfjsViewer: PdfJsViewerComponent;

    @Input()
    public zoom = 'page-width';

    @Input()
    public pdfSrc: string | Blob | Uint8Array;

    @Input()
    public openFile = false;

    @Input()
    public downloadFileName: string;

    @Input()
    public viewBookmark = false;

    @Input()
    public customPdfCss = false;

    ngOnInit(): void {
        const iframe =
            this.pdfjsViewerWrapper.nativeElement.querySelector('iframe');
        iframe.setAttribute('frameBorder', 0);
    }

    public refresh = () => setTimeout((_) => this.pdfjsViewer.refresh());
}
