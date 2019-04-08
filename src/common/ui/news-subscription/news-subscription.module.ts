import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { FormModule } from '../forms/form.module';
import { NewsSubscriptionComponent } from './news-subscription.component';

@NgModule({
    declarations: [
        NewsSubscriptionComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        NewsSubscriptionComponent,
    ],
})
export class NewsSubscriptionModule {}
