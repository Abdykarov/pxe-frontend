import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';

import { CONSTS } from 'src/app/app.constants';
import {
    isFullScreenMode,
    isScreenApiAvailable,
    openFullscreen,
    playVideo,
} from 'src/common/utils';

@Component({
    selector: 'pxe-lp-video-modal',
    styleUrls: ['./lp-video-modal.component.scss'],
    templateUrl: './lp-video-modal.component.html',
})
export class LpVideoModalComponent implements OnInit, OnDestroy {

    @ViewChild('video', { static: true })
    public _video: ElementRef;

    @Input()
    public modalOpen: boolean;

    @Input()
    public instanceData: any;

    @Output()
    public closeModal: EventEmitter<any> = new EventEmitter<any>();

    private fullscreenchangeListener: () => void;

    constructor(
        public cd: ChangeDetectorRef,
        private renderer: Renderer2,
    ) {}


    ngOnInit() {
        const isMoreThanLgResolution = window.innerWidth >= CONSTS.LG_RESOLUTION;

        if (!isMoreThanLgResolution) {
            openFullscreen(this.video);
            if (isScreenApiAvailable()) {
                // catch for chrome emulator
                window.screen.orientation.lock('landscape').catch(_ => {});
            }

            this.fullscreenchangeListener = this.renderer.listen(this.video, 'fullscreenchange', (event) => {
                if (!isFullScreenMode()) {
                    this.closeModal.emit();
                }
            });
        }
    }

    ngOnDestroy(): void {
        if (isScreenApiAvailable()) {
            window.screen.orientation.unlock();
        }

        if (this.fullscreenchangeListener) {
            this.fullscreenchangeListener();
        }
    }

    public play = (event = null) => {
        if (event) {
            event.preventDefault();
        }

        playVideo(this.video);
    }

    public pause =  (event = null) => {
        if (event) {
            event.preventDefault();
        }

        this.video.pause();
    }

    get isVideoPlaying(): boolean {
        return this._video && !this.video.paused;
    }

    get video(): HTMLMediaElement {
        return this._video && this._video.nativeElement;
    }
}
