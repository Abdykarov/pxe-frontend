import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import { RegisterAbstractComponent } from '../abstract/register-abstract.component';

@Component({
    selector: 'pxe-sign-up-form-container',
    templateUrl: './sign-up-form-container.component.html',
    styleUrls: ['./sign-up-form-container.component.scss'],
})
export class SignUpFormContainerComponent extends RegisterAbstractComponent {

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
