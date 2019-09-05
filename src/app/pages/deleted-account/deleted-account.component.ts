import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { takeUntil } from 'rxjs/operators';

import * as mutations from 'src/common/graphql/mutations';
import { AbstractComponent } from 'src/common/abstract.component';
import {
    CONSTS,
    ROUTES,
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
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './deleted-account.component.html',
})
export class DeletedAccountComponent extends AbstractComponent {

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

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
        private router: Router,
        private scrollToService: ScrollToService,
    ) {
        super();
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
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.apollo
            .mutate({
                mutation: mutations.makeRegistrationMutation,
                variables: values,
            })
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
                    scrollToElementFnc(this.subscriptionElement.nativeElement);
                    this.cd.markForCheck();
                });
    }

    public scrollToNewSubscription = () => this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.LANDING_SUBSCRIPTION);
}
