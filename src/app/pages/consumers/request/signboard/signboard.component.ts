import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import * as R from 'ramda';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CONSTS, GTM_CONSTS } from 'src/app/app.constants';
import { AbstractComponent } from 'src/common/abstract.component';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { AuthService } from 'src/common/services/auth.service';
import { CryptoService } from 'src/common/services/crypto.service';
import { GTMService } from 'src/common/services/gtm.service';
import { NavigateConsumerService } from 'src/common/services/navigate-consumer.service';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { getConfigStepper, playVideo } from 'src/common/utils';

@Component({
    selector: 'lnd-signboard',
    templateUrl: './signboard.component.html',
    styleUrls: ['./signboard.component.scss'],
})
export class SignboardComponent extends AbstractComponent {
    @ViewChild('video')
    public _video: ElementRef;

    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(
        this.ACTUAL_PROGRESS_STATUS
    );
    public showWelcome = false;
    public showTextUnderVideo = true;
    public idFileUploader = 'file-upload';

    public isMoreThanMdResolution = false;

    public resizeEvent$ = fromEvent(window, 'resize').pipe(debounceTime(200));

    constructor(
        public authService: AuthService,
        public cd: ChangeDetectorRef,
        private cryptoService: CryptoService,
        private gtmService: GTMService,
        public navigateConsumerService: NavigateConsumerService
    ) {
        super();
        this.showWelcome = R.path(['history', 'state', 'afterLogin'], window);

        if (isPlatformBrowser) {
            this.isMoreThanMdResolution =
                window.innerWidth >= CONSTS.MD_RESOLUTION;
        }

        this.resizeEvent$.pipe(takeUntil(this.destroy$)).subscribe((_) => {
            this.isMoreThanMdResolution =
                window.innerWidth >= CONSTS.MD_RESOLUTION;
            this.cd.markForCheck();
        });

        this.gtmService.loadFormEvent(
            GTM_CONSTS.LABELS.STEP_ONE,
            this.cryptoService.hashedUserId
        );
    }

    public routerToNextStep = (evt) => {
        evt.preventDefault();
        this.gtmService.pushEvent({
            event: GTM_CONSTS.EVENTS.EVENT_TRACKING,
            category: GTM_CONSTS.CATEGORIES.FORM,
            action: GTM_CONSTS.ACTIONS.START,
            label: GTM_CONSTS.LABELS.STEP_ONE,
            userID: this.cryptoService.hashedUserId,
        });
        this.navigateConsumerService.navigateToRequestStepByProgressStatus(
            ProgressStatus.SUPPLY_POINT
        );
    };

    public videoEnded = (event) => {
        this.showTextUnderVideo = true;
        this.video.currentTime = 0;
        this.pause(); // fix for IE
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
