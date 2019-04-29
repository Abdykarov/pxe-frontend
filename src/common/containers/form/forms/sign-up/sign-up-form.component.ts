import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import { RegisterAbstractComponent } from 'src/common/containers/form/abstract/register-abstract.component';
import { Router } from '@angular/router';
import { SignUpType } from 'src/common/containers/form/models/form-definition.model';

@Component({
    selector: 'pxe-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent extends RegisterAbstractComponent {

    constructor(
        public apollo: Apollo,
        public cd: ChangeDetectorRef,
        public router: Router,
    ) {
        super(
            apollo,
            cd,
            router,
            SignUpType.SignUp,
        );
    }
}
