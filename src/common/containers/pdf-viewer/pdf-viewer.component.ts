/*
    Copy of RB-DMS

    EDITS:
        - Load the pdf worker source from static source, PDFJS.workerSrc
        - Disabled text layer factory - pdfOptions.textLayerFactory
 */
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    PDFDocumentProxy,
    PDFPageProxy,
    PDFProgressData,
    PDFPromise,
    PDFSource,
    PDFViewerParams,
} from 'pdfjs-dist/build/pdf';
import * as PDFJS from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer';
import { CONSTS } from 'src/app/app.constants';

PDFJS.verbosity = PDFJS.PDFJS.VERBOSITY_LEVELS.errors;

@Component({
    selector: 'pxe-pdf-viewer',
    templateUrl: 'pdf-viewer.component.html',
})
export class PdfViewerComponent implements OnChanges, OnInit {

    @Input('page')
    set page(_page) {
        _page = parseInt(_page, 10);

        if (this._pdf && !this.isValidPageNumber(_page)) {
            _page = 1;
        }

        this._page = _page;
        this.pageChange.emit(_page);
    }

    @Input('render-text')
    set renderText(renderText: boolean) {
        this._renderText = renderText;
    }

    @Input('original-size')
    set originalSize(originalSize: boolean) {
        this._originalSize = originalSize;
    }

    @Input('show-all')
    set showAll(value: boolean) {
        this._showAll = value;
    }

    @Input('stick-to-page')
    set stickToPage(value: boolean) {
        this._stickToPage = value;
    }

    @Input('zoom')
    set zoom(value: number) {
        if (value <= 0) {
            return;
        }

        this._zoom = value;
    }

    get zoom() {
        return this._zoom;
    }

    @Input('rotation')
    set rotation(value: number) {
        if (!(typeof value === 'number' && value % 90 === 0)) {
            console.warn('Invalid pages rotation angle.');
            return;
        }

        this._rotation = value;
    }

    @Input('external-link-target')
    set externalLinkTarget(value: string) {
        this._externalLinkTarget = value;
    }

    /**
     *
     * @param {ElementRef} element
     * @param {ContentViewerActions} contentViewerActions
     * @param {IModuleToken} contentViewerToken
     */
    constructor(
        private element: ElementRef,
    ) {
        PDFJS.PDFJS.workerSrc = `/assets/images/pdf.worker.js`;
    }
    static CSS_UNITS: number = 96.0 / 66.0;

    private _renderText = true;
    private _stickToPage = false;
    private _originalSize = true;
    private _pdf: PDFDocumentProxy;
    private _page = 1;
    private _zoom = 1;
    private _rotation = 0;
    private _showAll = true;
    private _externalLinkTarget = 'blank';
    private _pdfViewer: any;
    private _pdfLinkService: any;
    private _loading = false;
    private lastLoaded: string | Uint8Array | PDFSource;

    @Output()
    public errorAction = new EventEmitter<any>();
    @Output()
    public progressAction = new EventEmitter<PDFProgressData>();
    @Output()
    public pageChange: EventEmitter<number> = new EventEmitter<number>(true);

    @Input() src: string | Uint8Array | PDFSource;

    static setExternalLinkTarget(type: string) {
        switch (type) {
            case 'blank':
                (<any>PDFJS).externalLinkTarget = PDFJS.PDFJS.LinkTarget.BLANK;
                break;
            case 'none':
                (<any>PDFJS).externalLinkTarget = PDFJS.PDFJS.LinkTarget.NONE;
                break;
            case 'self':
                (<any>PDFJS).externalLinkTarget = PDFJS.PDFJS.LinkTarget.SELF;
                break;
            case 'parent':
                (<any>PDFJS).externalLinkTarget = PDFJS.PDFJS.LinkTarget.PARENT;
                break;
            case 'top':
                (<any>PDFJS).externalLinkTarget = PDFJS.PDFJS.LinkTarget.TOP;
                break;
        }
    }

    static removeAllChildNodes(element: HTMLElement) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    ngOnInit() {
        this.setupViewer();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('src' in changes) {
            this.loadPDF();
        } else if (this._pdf) {
            if ('renderText' in changes) {
                this.setupViewer();
            }
            this.update();
        }
    }

    public setupViewer() {
        (<any>PDFJS).disableTextLayer = !this._renderText;

        PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);

        this._pdfLinkService = new PDFJS.PDFJS.PDFLinkService();

        const pdfOptions: PDFViewerParams | any = {
            container: this.element.nativeElement.querySelector('div'),
            removePageBorders: true,
            linkService: this._pdfLinkService,
        };

        this._pdfViewer = new PDFJS.PDFJS.PDFViewer(pdfOptions);
        this._pdfLinkService.setViewer(this._pdfViewer);
    }

    public updateSize() {
        if (!this._showAll) {
            this.renderPage(this._page);
            return;
        }

        if (this._originalSize) {
            this._pdfViewer._setScale(this._zoom, true);
            return;
        }

        this._pdf.getPage(this._pdfViewer.currentPageNumber).then((page: PDFPageProxy) => {
            this._pdfViewer._setScale(this.getScale(page.getViewport(1).width), !this._stickToPage);
        });
    }

    private isValidPageNumber(page: number): boolean {
        return this._pdf.numPages >= page && page >= 1;
    }

    private loadPDF() {
        if (!this.src) {
            return;
        }

        this.src = (this.src instanceof Uint8Array) ? this.src : new Uint8Array(this.src);

        if (this.lastLoaded === this.src) {
            this.update();
            return;
        }

        const loadingTask: any = PDFJS.getDocument(this.src);

        loadingTask.onProgress = (progressData: PDFProgressData) => {
            this.progressAction.emit(progressData);
        };

        const src = this.src;
        (<PDFPromise<PDFDocumentProxy>>loadingTask.promise)
            .then((pdf: PDFDocumentProxy) => {
                this._pdf = pdf;
                this.lastLoaded = src;

                // this.setPageCount(pdf.numPages, this.contentViewerToken);

                this.update();
            }, (error: any) => {
                this.errorAction.emit(error);
            });
    }

    private update() {
        if (this._showAll) {
            this.setupViewer();

            if (this._pdfViewer) {
                this._pdfViewer.setDocument(this._pdf);
            }
        }

        if (this._pdfLinkService) {
            this._pdfLinkService.setDocument(this._pdf, null);
        }

        this.page = this._page;

        this.render();
    }

    private render() {
        if (this._showAll) {
            this.renderMultiplePages();
        } else {
            this.renderPage(this._page);
        }
    }

    private renderMultiplePages() {
        if (!this.isValidPageNumber(this._page)) {
            this._page = 1;
        }

        if (this._rotation !== 0 || this._pdfViewer.pagesRotation !== this._rotation) {
            setTimeout(() => {
                this._pdfViewer.pagesRotation = this._rotation;
            });
        }

        if (this._stickToPage) {
            setTimeout(() => {
                this._pdfViewer.currentPageNumber = this._page;
            });
        }

        this.updateSize();
    }

    private renderPage(pageNumber: number) {
        if (typeof this._pdf === 'undefined') {
            return;
        }

        this._pdf.getPage(pageNumber).then( (page: PDFPageProxy) => {
            if (this._loading) {
                return;
            }

            let viewport = page.getViewport(this._zoom, this._rotation);
            const container = this.element.nativeElement.querySelector('.pdfViewer');
            let scale = this._zoom;

            if (!this._originalSize) {
                viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width, this._rotation);
                scale = this.getScale(page.getViewport(1).width);
            }

            // PAGE PRELOADING
            this.preloadAnotherPage(pageNumber);

            PdfViewerComponent.removeAllChildNodes(container);

            (<any>PDFJS).disableTextLayer = !this._renderText;

            PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);

            this._pdfLinkService = new PDFJS.PDFJS.PDFLinkService();

            const pdfOptions: PDFViewerParams | any = {
                container,
                removePageBorders: true,
                linkService: this._pdfLinkService,
                defaultViewport: viewport,
                scale,
                id: this._page,
                // No needs for textLayerFactory on rb-dms project
                // -
                // textLayerFactory: new (<any>PDFJS).DefaultTextLayerFactory(),
                textLayerFactory: null,
                annotationLayerFactory: new PDFJS.PDFJS.DefaultAnnotationLayerFactory(),
            };

            const pdfPageView = new PDFJS.PDFJS.PDFPageView(pdfOptions);
            this._pdfLinkService.setViewer(pdfPageView);

            if (this._rotation !== 0 || pdfPageView.rotation !== this._rotation) {
                pdfPageView.rotation = this._rotation;
            }

            pdfPageView.setPdfPage(page);

            // pdfPageView.onBeforeDraw = () => this.emitOnBeforeDraw();
            // pdfPageView.onAfterDraw = () => this.emitOnAfterDraw();

            return pdfPageView.draw();
        });
    }

    private preloadAnotherPage(pageNumber) {
        if (this._pdf.numPages === pageNumber) {
            return;
        }

        this._pdf.getPage(pageNumber + 1).then((page) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const renderContext = {
                canvasContext: context,
                viewport: page.getViewport(
                    this.getScale(page.getViewport(1).width),
                ),
            };
            page.render(renderContext);
        });
    }
    //
    // @dispatch()
    // private emitOnBeforeDraw() {
    //     this._loading = true;
    //     return namespaceAction(this.contentViewerToken)(
    //         this.contentViewerActions.setLoading(),
    //     );
    // }
    //
    // @dispatch()
    // private emitOnAfterDraw() {
    //     this._loading = false;
    //     return namespaceAction(this.contentViewerToken)(
    //         this.contentViewerActions.setLoaded(),
    //     );
    // }

    private getScale(viewportWidth) {
        const offsetWidth = this.element.nativeElement.offsetWidth;
        return this._zoom * (offsetWidth / viewportWidth) / PdfViewerComponent.CSS_UNITS;
    }

    @HostListener('window:resize', [])
    public onPageResize() {
        this.updateSize();
    }
}
