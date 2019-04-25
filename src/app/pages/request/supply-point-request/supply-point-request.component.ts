import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { formFields } from 'src/common/containers/form-container/supply-point-form/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form-container/models/form-definition.model';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { parseRestAPIErrors } from 'src/common/utils/';

@Component({
    templateUrl: './supply-point-request.component.html',
    styleUrls: ['./supply-point-request.component.scss'],
})
export class SupplyPointRequestComponent extends AbstractComponent {
    public formFields = formFields;
    public loginGlobalError: string[] = [];
    public fieldError: IFieldError = {};
    public submitLoginFormLoading = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();
    }

    public submitLoginForm = (values) => {
        this.submitLoginFormLoading = true;
        this.loginGlobalError = [];
        this.fieldError = {};
        console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', values);
        return;

        /*
        const {fieldError, globalError} = parseGraphQLErrors(error);
        this.fieldError = fieldError;
        * */

        this.authService
            .login(values)
            .subscribe(
                () => {
                    this.submitLoginFormLoading = false;
                    console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', values);
                },
                error => {
                    const message = parseRestAPIErrors(error);
                    this.submitLoginFormLoading = false;
                    this.loginGlobalError.push(message);
                    this.cd.markForCheck();
                });

    }
}
