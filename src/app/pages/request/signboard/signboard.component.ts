import {Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';

import { getConfigStepper } from 'src/common/utils';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { ROUTES } from 'src/app/app.constants';

@Component({
    selector: 'lnd-signboard',
    templateUrl: './signboard.component.html',
    styleUrls: ['./signboard.component.scss'],
})
export class SignboardComponent {

    @ViewChild('video')
    public video: ElementRef;

    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;
    public isVideoPlaying = false;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public showWelcome = false;

    constructor(
        private router: Router,
    ) {
        this.showWelcome = R.path(['history', 'state', 'afterLogin'], window);
    }

    public routerToNextStep = (evt) => {
        evt.preventDefault();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
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
