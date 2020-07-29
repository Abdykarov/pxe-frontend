import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';

import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';

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
        if (this.customPdfCss) {
            const iframe = this.pdfjsViewerWrapper.nativeElement.querySelector('iframe');
            iframe.setAttribute('frameBorder', 0);
            iframe.onload = () => {
                const contentWindow = (iframe.contentWindow || iframe.contentDocument);
                const head = contentWindow.document.getElementsByTagName('head')[0];
                const link = document.createElement('link');
                link.setAttribute('type', 'text/css');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', '/pdf-viewer-custom.css');
                head.append(link);
            };
        }
    }

    public refresh = () => this.pdfjsViewer.refresh();
}

