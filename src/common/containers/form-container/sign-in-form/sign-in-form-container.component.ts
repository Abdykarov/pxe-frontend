import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import { SignInAbstractComponent } from '../abstract/sign-in-abstract.component';

@Component({
    selector: 'pxe-sign-in-form-container',
    templateUrl: './sign-in-form-container.component.html',
    styleUrls: ['./sign-in-form-container.component.scss'],
})
export class SignInFormContainerComponent extends  SignInAbstractComponent {

    constructor(
        protected apollo: Apollo,
        protected cd: ChangeDetectorRef,
    ) {
        super(
            apollo,
            cd,
        );
    }
}
