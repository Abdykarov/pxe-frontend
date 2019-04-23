import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { configSuppliers } from 'src/common/containers/map-coverage-container/map-coverage-container.config';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { parseRestAPIErrors } from 'src/common/utils';
import { signInFormFields } from './sign-in.config';

@Component({
    selector: 'pxe-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends AbstractComponent {
    public signInFormFields = signInFormFields;
    public signInGlobalError: string[] = [];
    public submitSignInFormLoading = false;

    public configSuppliers: any = configSuppliers;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();
    }

    public submitSignInForm = (values) => {
        this.submitSignInFormLoading = true;
        this.signInGlobalError = [];
        this.authService
            .signIn(values);
            // .subscribe(
            //     () => {
            //         this.submitSignInFormLoading = false;
            //         this.router.navigate(['/secured']);
            //     },
            //     error => {
            //         const message = parseRestAPIErrors(error);
            //         this.submitSignInFormLoading = false;
            //         this.signInGlobalError.push(message);
            //         this.cd.markForCheck();
            //     });
    }
}

