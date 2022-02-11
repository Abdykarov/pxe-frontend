import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { CONSTS } from 'src/app/app.constants';
import { lpVideoModalConfig } from 'src/app/pages/public/landing/landing.config';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { personalizationOptions } from './lp-personalization-container.config';
import { IPersonalization } from './models/models';
import { LpPersonalizationService } from './services/lp-personalization.service';

@Component({
    selector: 'lnd-lp-personalization-container',
    templateUrl: './lp-personalization-container.component.html',
    styleUrls: ['./lp-personalization-container.component.scss'],
})
export class LpPersonalizationContainerComponent implements OnInit {
    public personalizationOptions = personalizationOptions;
    public currentPersonalization = '';
    public currentPersonalizationOption: IPersonalization = null;

    constructor(
        private authService: AuthService,
        private modalService: ModalService,
        private lpPersonalizationService: LpPersonalizationService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string
    ) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const fragment = this.route.snapshot.fragment;
            this.currentPersonalization =
                this.lpPersonalizationService.processPersonalization(fragment);
            this.currentPersonalizationOption = R.find(
                R.propEq('fragment', this.currentPersonalization)
            )(personalizationOptions);

            if (!this.currentPersonalizationOption) {
                this.currentPersonalizationOption =
                    this.getDefaultPersonalizationOption();
            }
        } else {
            this.currentPersonalizationOption =
                this.getDefaultPersonalizationOption();
        }
    }

    public playVideoInModal = (event) => {
        event.preventDefault();
        this.modalService.showModal$.next(lpVideoModalConfig());
    };

    public getDefaultPersonalizationOption = () =>
        R.find(R.propEq('fragment', ''))(personalizationOptions);

    public routeToSignUp = (evt) => {
        evt.preventDefault();
        if (this.authService.isLogged()) {
            this.authService.homeRedirect(true);
        } else {
            this.router.navigate([CONSTS.PATHS.SIGN_UP]);
        }
    };
}
