import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { UnsubscribeNewsContainerModule } from 'src/common/containers/unsubscribe-news-container/unsubscribe-news-container.module';
import { UnsubscribeRoutingModule } from './unsubcribe-news.routing';
import { UnsubscribeNewsComponent } from './unsubscribe-news.component';

@NgModule({
    declarations: [UnsubscribeNewsComponent],
    imports: [
        CommonModule,
        UnsubscribeRoutingModule,
        LayoutContainerModule,
        UnsubscribeNewsContainerModule,
    ],
})
export class UnsubscribeNewsModule {}
