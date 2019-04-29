import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';

import { RegisterAbstractComponent } from 'src/common/containers/form/abstract/register-abstract.component';
import { SignUpType } from 'src/common/containers/form/models/form-definition.model';

@Component({
    selector: 'pxe-news-subscription-form',
    templateUrl: './news-subscription-form.component.html',
    styleUrls: ['./news-subscription-form.component.scss'],
})
export class NewsSubscriptionFormComponent extends RegisterAbstractComponent {

    constructor(
        public apollo: Apollo,
        public cd: ChangeDetectorRef,
        public router: Router,
    ) {
        super(
            apollo,
            cd,
            router,
            SignUpType.NewsSubscription,
        );
    }
}
