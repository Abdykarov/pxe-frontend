import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import { RegisterAbstractComponent } from '../abstract/register-abstract.component';

@Component({
    selector: 'pxe-sign-in-form-container',
    templateUrl: './sign-in-form-container.component.html',
    styleUrls: ['./sign-in-form-container.component.scss'],
})
export class SignInFormContainerComponent extends RegisterAbstractComponent {

    constructor(
        public apollo: Apollo,
        public cd: ChangeDetectorRef,
    ) {
        super(
            apollo,
            cd,
        );
    }
}
