import {
    Component,
    ChangeDetectorRef,
    ElementRef,
    ViewChild,
} from '@angular/core';

import { Apollo } from 'apollo-angular';
import { takeUntil } from 'rxjs/operators';

import * as mutations from 'src/common/graphql/mutations';
import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
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
    templateUrl: './landing.component.html',
})
export class LandingComponent extends AbstractComponent {

    @ViewChild('pxe_subscription')
    public pxeSubscriptionForm: ElementRef;

    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formFields: IForm;

    public images = CONSTS.IMAGES;

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
        private scrollToService: ScrollToService,
    ) {
        super();
        this.formFields = createRegistrationFormFields(SignUpType.NewsSubscription);

        this.scrollToService.getScrollStream()
            .pipe(takeUntil(this.destroy$))
            .subscribe((scrollTo: SCROLL_TO) => {
                if (scrollTo === SCROLL_TO.LANDING_SUBSCRIPTION) {
                    scrollToElementFnc(this.pxeSubscriptionForm.nativeElement);
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
                },
                (error) => {
                    this.formLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public scrollToNewSubscription = () => this.scrollToService.scrollToSubscription();
}
