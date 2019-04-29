import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewsSubscriptionFormComponent } from './news-subscription-form.component';
import { NewsSubscriptionModule } from 'src/common/ui/news-subscription/news-subscription.module';

@NgModule({
    declarations: [
        NewsSubscriptionFormComponent,
    ],
    imports: [
        CommonModule,
        NewsSubscriptionModule,
    ],
    exports: [
        NewsSubscriptionFormComponent,
    ],
})
export class NewsSubscriptionFormModule {}
