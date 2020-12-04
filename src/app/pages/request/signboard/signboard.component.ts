import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';

import { AuthService } from 'src/app/services/auth.service';
import {
    getConfigStepper,
    playVideo,
} from 'src/common/utils';
import { GTMService } from 'src/app/services/gtm.service';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { GTM_CONSTS, ROUTES } from 'src/app/app.constants';

@Component({
    selector: 'lnd-signboard',
    templateUrl: './signboard.component.html',
    styleUrls: ['./signboard.component.scss'],
})
export class SignboardComponent {

    @ViewChild('video')
    public _video: ElementRef;

    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public showWelcome = false;

    constructor(
        private authService: AuthService,
        public cd: ChangeDetectorRef,
        private gtmService: GTMService,
        private router: Router,
    ) {
        this.showWelcome = R.path(['history', 'state', 'afterLogin'], window);
        this.gtmService.pushEvent({
            'event': GTM_CONSTS.EVENTS.EVENT_TRACKING,
            'category': GTM_CONSTS.CATEGORIES.FORM,
            'action': GTM_CONSTS.ACTIONS.VIEW,
            'label': GTM_CONSTS.LABELS.STEP_ONE,
            'userID': this.authService.currentUserValue.uuid,
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
