import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import * as R from 'ramda';
import { fromEvent } from 'rxjs';
import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import {
    getConfigStepper,
    playVideo,
} from 'src/common/utils';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'lnd-signboard',
    templateUrl: './signboard.component.html',
    styleUrls: ['./signboard.component.scss'],
})
export class SignboardComponent extends AbstractComponent {

    @ViewChild('video')
    public _video: ElementRef;

    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public showWelcome = false;

    public isMoreThanMdResolution = false;

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
        );

    constructor(
        public cd: ChangeDetectorRef,
        private router: Router,
    ) {
        super();
        this.showWelcome = R.path(['history', 'state', 'afterLogin'], window);

        if (isPlatformBrowser) {
            this.isMoreThanMdResolution = window.innerWidth >= CONSTS.MD_RESOLUTION;
        }

        this.resizeEvent$
            .pipe(takeUntil(this.destroy$))
            .subscribe(_  => {
                this.isMoreThanMdResolution = window.innerWidth >= CONSTS.MD_RESOLUTION;
                this.cd.markForCheck();
            });
    }

    public routerToNextStep = (evt) => {
        evt.preventDefault();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
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
