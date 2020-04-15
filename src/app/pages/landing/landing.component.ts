import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CONSTS,
    ROUTES,
    SEO,
} from 'src/app/app.constants';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import {
    IFieldError,
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import {
    parseGraphQLErrors,
    scrollToElementFnc,
} from 'src/common/utils';
import { RegistrationService } from 'src/common/graphql/services/registration.service';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './landing.component.html',
})
export class LandingComponent extends AbstractComponent implements AfterViewInit {

    @ViewChild('subscription')
    public subscriptionElement: ElementRef;

    @ViewChild('mapCoverage')
    public mapCoverageElement: ElementRef;

    @ViewChild('supplierChange')
    public supplierChangeElement: ElementRef;

    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formFields: IForm;
    public routes = ROUTES;

    public isMoreThanXlResolution = false;

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
        );

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        private router: Router,
        private registrationService: RegistrationService,
        private scrollToService: ScrollToService,
        private titleService: Title,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.isMoreThanXlResolution = window.innerWidth >= CONSTS.XL_RESOLUTION;
        }

        this.titleService.setTitle(CONSTS.TITLES.LANDING_PAGE);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.LANDING_PAGE,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: SEO.META_KEYWORDS.LANDING_PAGE.toString(),
        });

        this.formFields = createRegistrationFormFields(SignUpType.SignUp);

        this.scrollToService.getScrollStream()
            .pipe(takeUntil(this.destroy$))
            .subscribe((scrollTo: SCROLL_TO) => {
                if (scrollTo === SCROLL_TO.LANDING_SUBSCRIPTION) {
                    scrollToElementFnc(this.subscriptionElement.nativeElement);
                }
                if (scrollTo === SCROLL_TO.MAP_COVERAGE) {
                    scrollToElementFnc(this.mapCoverageElement.nativeElement);
                }
                if (scrollTo === SCROLL_TO.SUPPLIER_CHANGE) {
                    scrollToElementFnc(this.supplierChangeElement.nativeElement);
                }
            });

        this.resizeEvent$
            .pipe(takeUntil(this.destroy$))
            .subscribe(_  => {
                this.isMoreThanXlResolution = window.innerWidth >= CONSTS.XL_RESOLUTION;
                this.autoPlayVideoInAllBrowsers();
                this.cd.markForCheck();
            });
    }

    autoPlayVideoInAllBrowsers = () => {
        if (this.isMoreThanXlResolution) {
            const myVideo = document.querySelector('video');
            const promise = myVideo && myVideo.play();
            if (promise !== undefined) {
                promise.then(_ => ({}))
                    .catch(error => {
                        myVideo.muted = true;
                        myVideo.play();
                    });
            }
        }
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.autoPlayVideoInAllBrowsers();
            this.cd.markForCheck();
        }
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.registrationService.makeRegistration(values)
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                    this.router.navigate([CONSTS.PATHS.LOGIN],
                        {
                            queryParams: {
                                email: values.email,
                            },
                            state: {
                                passwordWasSent: true,
                            },
                        },
                    );
                },
                (error) => {
                    this.formLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public scrollToNewSubscription = () => this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.LANDING_SUBSCRIPTION);
}
