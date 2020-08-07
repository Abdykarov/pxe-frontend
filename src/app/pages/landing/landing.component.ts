import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractFaqComponent } from 'src/app/pages/faq/abstract-faq.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    ROUTES,
    S_ANALYTICS,
    SEO,
} from 'src/app/app.constants';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import { FaqService } from 'src/app/services/faq.service';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import {
    IFieldError,
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { ILogoutRequired } from 'src/app/services/model/logout-required.model';
import { IsLoggedPipe } from 'src/common/pipes/is-logged/is-logged.pipe';
import { IQuestion } from 'src/app/services/model/faq.model';
import {
    parseGraphQLErrors,
    scrollToElementFnc,
} from 'src/common/utils';
import { RegistrationService } from 'src/common/graphql/services/registration.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './landing.component.html',
})
export class LandingComponent extends AbstractFaqComponent implements AfterViewInit {
    @ViewChild('video')
    public video: ElementRef;

    public isVideoPlaying = false;

    @ViewChild('subscription')
    public subscriptionElement: ElementRef;

    @ViewChild('faq')
    public faq: ElementRef;

    @ViewChild('aboutUs')
    public aboutUs: ElementRef;

    @ViewChild('aboutService')
    public aboutService: ElementRef;

    public frequentedQuestions: IAccordionItem[] = [];
    public formLoading = false;
    public formSent = false;
    public isPlatformBrowser = isPlatformBrowser(this.platformId);
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
        public authService: AuthService,
        private cd: ChangeDetectorRef,
        public faqService: FaqService,
        private isLoggedPipe: IsLoggedPipe,
        private metaService: Meta,
        public route: ActivatedRoute,
        public router: Router,
        private registrationService: RegistrationService,
        private sAnalyticsService: SAnalyticsService,
        private scrollToService: ScrollToService,
        private titleService: Title,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super(faqService, route);
        if (isPlatformBrowser) {
            this.isMoreThanXlResolution = window.innerWidth >= CONSTS.XL_RESOLUTION;
        }

        this.loadConfigs$
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                _ => {
                    this.frequentedQuestions = R.filter((question: IQuestion) => question.oneOfMostVisited)(this.questions);
                    this.cd.markForCheck();
            });

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
                if (scrollTo === SCROLL_TO.FAQ) {
                    scrollToElementFnc(this.faq.nativeElement);
                }
                if (scrollTo === SCROLL_TO.ABOUT_US) {
                    scrollToElementFnc(this.aboutUs.nativeElement);
                }
                if (scrollTo === SCROLL_TO.ABOUT_SERVICE) {
                    scrollToElementFnc(this.aboutService.nativeElement);
                }
            });
    }

    public toggleVideo = (event = null) => {
        // tslint:disable-next-line:no-unused-expression
        event && event.preventDefault();
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

    public videoIsTouch = () => {
        if (this.isMoreThanXlResolution) {
            this.toggleVideo();
        }
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.authService.setActualStateFromOtherTab();
        const isLogged = this.isLoggedPipe.transform(this.authService.currentUserValue);
        if (isLogged) {
            this.authService.homeRedirect(false, ILogoutRequired.REGISTRATION);
        } else {
            this.registrationService.makeRegistration(values)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    () => {
                        this.formLoading = false;
                        this.sAnalyticsService.sendWebData(
                            {},
                            {
                                email: values.email,
                            },
                            {},
                            {
                                ACTION: S_ANALYTICS.ACTIONS.SIGN_UP,
                            },
                        );
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
    }

    public routerToFaq = (evt) => {
        evt.preventDefault();
        this.router.navigate([CONSTS.PATHS.FAQ]);
    }

    public scrollToNewSubscription = () =>  {
        this.authService.setActualStateFromOtherTab();
        const isLogged = this.isLoggedPipe.transform(this.authService.currentUserValue);
        if (!isLogged) {
            this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.LANDING_SUBSCRIPTION);
        }
    }
}
