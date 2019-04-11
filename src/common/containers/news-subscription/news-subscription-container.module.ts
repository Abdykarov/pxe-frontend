import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewsSubscriptionContainerComponent } from './news-subscription-container.component';
import { NewsSubscriptionModule } from 'src/common/ui/news-subscription/news-subscription.module';

@NgModule({
    declarations: [
        NewsSubscriptionContainerComponent,
    ],
    imports: [
        CommonModule,
        NewsSubscriptionModule,
    ],
    exports: [
        NewsSubscriptionContainerComponent,
    ],
})
export class NewsSubscriptionContainerModule {}
