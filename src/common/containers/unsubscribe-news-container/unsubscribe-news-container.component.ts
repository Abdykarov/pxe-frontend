import { ActivatedRoute } from '@angular/router';
import {
    Component,
    OnDestroy,
} from '@angular/core';

import { UnsubscribeNewsFacade } from 'src/app/pages/public/unsubscribe-news/unsubscribe-news.facade';

@Component({
    selector: 'pxe-unsubscribe-news-container',
    templateUrl: './unsubscribe-news-container.component.html',
    styleUrls: ['./unsubscribe-news-container.component.scss'],
})
export class UnsubscribeNewsContainerComponent implements OnDestroy {
    public readonly successResult$ = this.unsubscribeNewsFacade.successResult$;
    public readonly isLoading$ = this.unsubscribeNewsFacade.isLoading$;
    public readonly globalError$ = this.unsubscribeNewsFacade.globalError$;

    constructor(
        private route: ActivatedRoute,
        private unsubscribeNewsFacade: UnsubscribeNewsFacade,
    ) {
        this.unsubscribeNewsFacade.unsubscribe(route.snapshot.params['userProfileId']);
    }

    ngOnDestroy(): void {
        this.unsubscribeNewsFacade.resetState();
    }
}
