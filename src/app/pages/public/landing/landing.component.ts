import { isPlatformBrowser, Location } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { CONSTS, ROUTES } from 'src/app/app.constants';
import { AbstractFaqComponent } from 'src/app/pages/public/faq/abstract-faq.component';
import { AuthService } from 'src/app/services/auth.service';
import { FaqService } from 'src/app/services/faq.service';
import { GTMService } from 'src/app/services/gtm.service';
import { IQuestion } from 'src/app/services/model/faq.model';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';
import { ILandingPageQuery } from 'src/common/cms/models/landing-page';
import { NewsService } from 'src/common/cms/services/news.service';
import { AskForOfferContainerComponent } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.component';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import {
    IFieldError,
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { RegistrationService } from 'src/common/graphql/services/registration.service';
import { IsLoggedPipe } from 'src/common/pipes/common/is-logged/is-logged.pipe';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import { scrollToElementFnc } from 'src/common/utils';
import { scrollSettings } from './landing.config';

@Component({
    templateUrl: './landing.component.html',
})
export class LandingComponent
    extends AbstractFaqComponent
    implements OnDestroy
{
    @ViewChild('video', { static: true })
    public _video: ElementRef;

    @ViewChild('howItWorks', { static: true })
    public howItWorks: ElementRef;

    @ViewChild('faq', { static: true })
    public faq: ElementRef;

    @ViewChild('howItWorksFileContainer', { static: true })
    public howItWorksFileContainer: AskForOfferContainerComponent;

    @ViewChild('lastContentFileUploader', { static: true })
    public lastContentFileUploader: AskForOfferContainerComponent;

    @ViewChild('help', { static: true })
    public help: ElementRef;

    @ViewChild('bestPricesInTheWorld', { static: true })
    public bestPricesInTheWorld: ElementRef;

    @ViewChild('blog', { static: true })
    public blog: ElementRef;

    public activeCommodityTypeCarouselCompare = CommodityType.POWER;
    public CommodityType = CommodityType;
    public frequentedQuestions: IAccordionItem[] = [];
    public formLoading = false;
    public formSent = false;
    public isPlatformBrowser = isPlatformBrowser(this.platformId);
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formFields: IForm;
    public routes = ROUTES;
    public scrollSettings = scrollSettings;

    public readonly landingPageQuery: ILandingPageQuery =
        this.route.snapshot.data.landingPage;

    public readonly askForOffer =
        this.landingPageQuery.queryAskForOfferContents;
    public readonly landingPage =
        this.landingPageQuery.queryLandingPageContents;
    public readonly signUp = this.landingPageQuery.querySignUpContents;
    public readonly articles = this.landingPageQuery.queryArticleContents;

    public isMoreThanMdResolution = false;

    public resizeEvent$ = fromEvent(window, 'resize').pipe(debounceTime(200));

    @HostListener('window:popstate', ['$event'])
    public onBackButtonInBrowser(event) {
        const fragment = window.location.hash.substr(1);
        setTimeout((_) => {
            const margin = this.getMarginToScroll();
            scrollToElementFnc(fragment, margin);
        });
    }

    constructor(
        private apollo: Apollo,
        public authService: AuthService,
        public cd: ChangeDetectorRef,
        public faqService: FaqService,
        private gtmService: GTMService,
        private isLoggedPipe: IsLoggedPipe,
        private location: Location,
        private metaService: Meta,
        private newsService: NewsService,
        private modalService: ModalService,
        public route: ActivatedRoute,
        public router: Router,
        private registrationService: RegistrationService,
        private sAnalyticsService: SAnalyticsService,
        public scrollToService: ScrollToService,
        private titleService: Title,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        super(faqService, route);
        if (isPlatformBrowser) {
            this.isMoreThanMdResolution =
                window.innerWidth >= CONSTS.MD_RESOLUTION;
        }

        this.loadConfigs$.pipe(takeUntil(this.destroy$)).subscribe((_) => {
            this.frequentedQuestions = R.filter(
                (question: IQuestion) => question.oneOfMostVisited
            )(this.questions);
            this.cd.markForCheck();
        });

        const { title, description, keywords } = this.landingPage.seo;

        this.titleService.setTitle(title);
        this.metaService.updateTag({
            name: 'description',
            content: description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: keywords,
        });

        this.formFields = createRegistrationFormFields(SignUpType.SignUp);

        this.scrollToService
            .getScrollStream()
            .pipe(takeUntil(this.destroy$))
            .subscribe((scrollTo: SCROLL_TO) => {
                const margin = this.getMarginToScroll();
                if (scrollTo === SCROLL_TO.BEST_PRICES_IN_THE_WORLD) {
                    this.location.go(
                        `#${this.scrollToService.getFragmentFromScrollTo(
                            scrollTo
                        )}`
                    );
                    scrollToElementFnc(
                        this.bestPricesInTheWorld.nativeElement,
                        margin
                    );
                }
                if (scrollTo === SCROLL_TO.HELP) {
                    this.location.go(
                        `#${this.scrollToService.getFragmentFromScrollTo(
                            scrollTo
                        )}`
                    );
                    scrollToElementFnc(this.help.nativeElement, margin);
                }
                if (scrollTo === SCROLL_TO.HOW_IT_WORKS) {
                    this.location.go(
                        `#${this.scrollToService.getFragmentFromScrollTo(
                            scrollTo
                        )}`
                    );
                    scrollToElementFnc(this.howItWorks.nativeElement, margin);
                }
                if (scrollTo === SCROLL_TO.BLOG) {
                    this.location.go(
                        `#${this.scrollToService.getFragmentFromScrollTo(
                            scrollTo
                        )}`
                    );
                    scrollToElementFnc(this.blog.nativeElement, margin);
                }
                if (scrollTo === SCROLL_TO.FAQ) {
                    this.location.go(
                        `#${this.scrollToService.getFragmentFromScrollTo(
                            scrollTo
                        )}`
                    );
                    scrollToElementFnc(this.faq.nativeElement, margin);
                }
            });

        this.initScroll();

        this.resizeEvent$.pipe(takeUntil(this.destroy$)).subscribe((_) => {
            this.isMoreThanMdResolution =
                window.innerWidth >= CONSTS.MD_RESOLUTION;
            this.cd.markForCheck();
        });

        this.modalService.closeModalData$
            .pipe(
                takeUntil(this.destroy$),
                filter(R_.isNotNil),
                filter((modal: ICloseModalData) => modal.confirmed)
            )
            .subscribe((modal) => {
                this.modalService.closeModalData$.next(null);
            });
    }

    private getMarginToScroll = () => (this.isMoreThanMdResolution ? 20 : 60);

    public initScroll = () => {
        const initFragment = this.route.snapshot.fragment;
        const result =
            this.scrollToService.getScrollToFromFragment(initFragment);

        // timeout 300ms is needed for some reason
        setTimeout((_) => {
            this.scrollToService.activeScrollTo(result);
        }, 300);
    };

    ngOnDestroy() {
        super.ngOnDestroy();
        this.metaService.removeTag('google-site-verification');
    }

    public routeToSignUp = (evt) => {
        evt.preventDefault();
        if (this.authService.isLogged()) {
            this.authService.homeRedirect(true);
        } else {
            this.router.navigate([CONSTS.PATHS.SIGN_UP]);
        }
    };

    public routerToFaq = (evt) => {
        evt.preventDefault();
        this.router.navigate([CONSTS.PATHS.FAQ]);
    };

    public routerToAllArticle = (evt) => {
        evt.preventDefault();
        this.router.navigate([CONSTS.PATHS.BLOG, CONSTS.ALL_BLOG]);
    };
}
