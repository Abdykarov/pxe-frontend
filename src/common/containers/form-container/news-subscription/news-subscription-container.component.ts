import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import { RegisterAbstractComponent } from 'src/common/containers/form-container/abstract/register-abstract.component';
import { Router } from '@angular/router';
import { SignUpType } from '../models/form-definition.model';

@Component({
    selector: 'pxe-news-subscription-container',
    templateUrl: './news-subscription-container.component.html',
    styleUrls: ['./news-subscription-container.component.scss'],
})
export class NewsSubscriptionContainerComponent extends RegisterAbstractComponent {

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
