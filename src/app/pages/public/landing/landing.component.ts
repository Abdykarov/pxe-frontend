import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { Apollo } from 'apollo-angular';
import {
    debounceTime,
    filter,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractFaqComponent } from 'src/app/pages/public/faq/abstract-faq.component';
import {
    AskForOfferContainerComponent,
} from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import { FaqService } from 'src/app/services/faq.service';
import { GTMService } from 'src/app/services/gtm.service';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import { IAskForOffer } from 'src/common/cms/models/ask-for-offer';
import {IArticle, IType} from 'src/common/cms/models/blog';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import {
    IFieldError,
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { ILandingPage } from 'src/common/cms/models/landing-page';
import { IsLoggedPipe } from 'src/common/pipes/is-logged/is-logged.pipe';
import { IQuestion } from 'src/app/services/model/faq.model';
import { ISignUp } from 'src/common/cms/models/sign-up';
import { NewsService } from 'src/common/cms/services/news.service';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { scrollToElementFnc } from 'src/common/utils';
import { RegistrationService } from 'src/common/graphql/services/registration.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';
import {ICardData} from '../../../../common/ui/card/models/data.model';

@Component({
    templateUrl: './landing.component.html',
})
export class LandingComponent extends AbstractFaqComponent implements OnDestroy {

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

    public readonly askForOffer: IAskForOffer = this.route.snapshot.data.askForOffer;
    public readonly landingPage: ILandingPage = this.route.snapshot.data.landingPage;
    public readonly signUp: ISignUp = this.route.snapshot.data.signUp;
    public readonly articles: ICardData[] = this.route.snapshot.data.articles;

    public isMoreThanMdResolution = false;

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
        );

    constructor(
        private apollo: Apollo,
        public authService: AuthService,
        public cd: ChangeDetectorRef,
        public faqService: FaqService,
        private gtmService: GTMService,
        private isLoggedPipe: IsLoggedPipe,
        private metaService: Meta,
        private newsService: NewsService,
        private modalService: ModalService,
        public route: ActivatedRoute,
        public router: Router,
        private registrationService: RegistrationService,
        private sAnalyticsService: SAnalyticsService,
        public scrollToService: ScrollToService,
        private titleService: Title,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super(faqService, route);
        if (isPlatformBrowser) {
            this.isMoreThanMdResolution = window.innerWidth >= CONSTS.MD_RESOLUTION;
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

        this.titleService.setTitle(this.landingPage.seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: this.landingPage.seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: this.landingPage.seo.keywords,
        });

        this.formFields = createRegistrationFormFields(SignUpType.SignUp);

        this.scrollToService.getScrollStream()
            .pipe(takeUntil(this.destroy$))
            .subscribe((scrollTo: SCROLL_TO) => {
                const margin = this.isMoreThanMdResolution ? 20 : 60;
                if (scrollTo === SCROLL_TO.BEST_PRICES_IN_THE_WORLD) {
                    scrollToElementFnc(this.bestPricesInTheWorld.nativeElement, margin);
                }
                if (scrollTo === SCROLL_TO.HELP) {
                    scrollToElementFnc(this.help.nativeElement, margin);
                }
                if (scrollTo === SCROLL_TO.BLOG) {
                    scrollToElementFnc(this.blog.nativeElement, margin);
                }
                if (scrollTo === SCROLL_TO.HOW_IT_WORKS) {
                    scrollToElementFnc(this.howItWorks.nativeElement, margin);
                }
                if (scrollTo === SCROLL_TO.FAQ) {
                    scrollToElementFnc(this.faq.nativeElement, margin);
                }
            });

        this.resizeEvent$
            .pipe(takeUntil(this.destroy$))
            .subscribe(_  => {
                this.isMoreThanMdResolution = window.innerWidth >= CONSTS.MD_RESOLUTION;
                this.cd.markForCheck();
            });

        this.modalService.closeModalData$
            .pipe(
                takeUntil(this.destroy$),
                filter(R_.isNotNil),
                filter((modal: ICloseModalData) => modal.confirmed),
            )
            .subscribe(modal => {
                this.modalService.closeModalData$.next(null);
            });
    }

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
    }

    public routerToFaq = (evt) => {
        evt.preventDefault();
        this.router.navigate([CONSTS.PATHS.FAQ]);
    }

    public showDetailArticle(article: ICardData): void {
        this.router.navigate([this.ROUTES.ROUTER_BLOG, 'all', article.id]);
    }
}
