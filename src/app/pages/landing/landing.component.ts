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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    templateUrl: './landing.component.html',
})
export class LandingComponent extends AbstractFaqComponent implements AfterViewInit {
    @ViewChild('video')
    public video: ElementRef;

    public isVideoPlaying = false;

    @ViewChild('subscription', { static: false })
    public subscriptionElement: ElementRef;

    @ViewChild('faq', { static: true })
    public faq: ElementRef;

    @ViewChild('aboutUs', { static: true })
    public aboutUs: ElementRef;

    @ViewChild('aboutService', { static: true })
    public aboutService: ElementRef;

    public frequentedQuestions: IAccordionItem[] = [];
    public formLoading = false;
    public formSent = false;
    public isPlatformBrowser = isPlatformBrowser(this.platformId);
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formFields: IForm;
    public routes = ROUTES;

    public isMoreThanMdResolution = false;

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
        );

    public ahoj = '';

    constructor(
        private http: HttpClient,
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
            this.isMoreThanMdResolution = window.innerWidth >= CONSTS.MD_RESOLUTION;
        }

        const body = new FormData();
        body.set('grant_type', 'client_credentials');
        body.set('client_id', 'pxe-parc4u:default');
        body.set('client_secret', 'oummskzkwilyxzzufv1xhcmg7ljxpavxuq6wiu9oizqx');
        body.set('scope', 'squidex-api');

        this.http.post('https://squidex.lnd.bz/identity-server/connect/token', body, {
            headers: {
                responseType: 'json',
            },
        }).subscribe(
            (data: any) => {
                console.log('CIS');
                console.log(data.access_token);
                this.http.post('https://squidex.lnd.bz/api/content/pxe-parc4u/graphql',
                    {'query': '{queryTestContents{data{title{iv}}}}', 'variables': null}, {
                    headers: {
                        'Content-Type': 'application/json',
                        responseType: 'json',
                        Authorization: 'Bearer ' + data.access_token,
                    },
                }).subscribe(
                    _ => {
                        this.ahoj = 'Asdasd';
                        this.cd.markForCheck();
                    },
                    __Error => {
                        console.log('ASDASD');
                        console.log(__Error);
                    },
                );

            },
        );

        // `grant_type: client_credentials`,
        //     'client_id: pxe-parc4u:default',
        //     'client_secret: oummskzkwilyxzzufv1xhcmg7ljxpavxuq6wiu9oizqx',
        //     'scope: squidex-api',


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

        this.resizeEvent$
            .pipe(takeUntil(this.destroy$))
            .subscribe(_  => {
                this.isMoreThanMdResolution = window.innerWidth >= CONSTS.MD_RESOLUTION;
                this.cd.markForCheck();
            });
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
                    .catch(_ => {
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
        if (this.isMoreThanMdResolution) {
            this.toggleVideo();
            this.isVideoPlaying = true;
            this.cd.detectChanges();
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
