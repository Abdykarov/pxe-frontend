import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import { RegisterAbstractComponent } from 'src/common/containers/form-container/abstract/register-abstract.component';

@Component({
    selector: 'pxe-news-subscription-container',
    templateUrl: './news-subscription-container.component.html',
    styleUrls: ['./news-subscription-container.component.scss'],
})
export class NewsSubscriptionContainerComponent extends RegisterAbstractComponent {

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
