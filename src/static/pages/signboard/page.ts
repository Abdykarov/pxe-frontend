import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { playVideo } from 'src/common/utils';
import { fileUploader } from 'src/static/pages/import-upload/config';
import { NewSupplyPointPageConfig } from 'src/static/pages/new-supply-point/config';

@Component({
    templateUrl: './page.html',
})
export class SignboardComponent {
    @ViewChild('video')
    public _video: ElementRef;

    public uploader = fileUploader;

    constructor(
        public cd: ChangeDetectorRef,
        public config: NewSupplyPointPageConfig
    ) {}

    public click = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    };

    public play = (event = null) => {
        if (event) {
            event.preventDefault();
        }

        playVideo(this.video);
    };

    public pause = (event = null) => {
        if (event) {
            event.preventDefault();
        }

        this.video.pause();
    };

    get isVideoPlaying(): boolean {
        return this._video && !this.video.paused;
    }

    get video(): HTMLMediaElement {
        return this._video && this._video.nativeElement;
    }
}
