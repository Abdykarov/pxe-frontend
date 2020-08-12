import {
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';

import * as R from 'ramda';

import { NewSupplyPointPageConfig } from 'src/static/pages/new-supply-point/config';

@Component({
  templateUrl: './page.html',
})

export class SignboardComponent {

    @ViewChild('video')
    public video: ElementRef;

    public isVideoPlaying = false;

    constructor(
        public config: NewSupplyPointPageConfig,
    ) {}

    public click = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }

    public toggleVideo = (event = null) => {
        if (event) {
            event.preventDefault();
        }

        const video: HTMLMediaElement = this.video.nativeElement;
        if (!this.isVideoPlaying) {
            const playPromise = video && video.play();
            if (!R.isNil(playPromise)) {
                this.isVideoPlaying = true;
                playPromise
                    .then(_ => ({}))
                    .catch(error => {
                        video.muted = true;
                        video.play();
                    });
            } else {
                this.isVideoPlaying = true;
            }
        } else {
            video.pause();
            this.isVideoPlaying = false;
        }
    }

}
