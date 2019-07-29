import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewsContainerComponent } from './news-container.component';
import { NewsModule } from 'src/common/ui/news/news.module';


@NgModule({
    declarations: [
        NewsContainerComponent,
    ],
    exports: [
        NewsContainerComponent,
    ],
    imports: [
        CommonModule,
        NewsModule,
    ],
})
export class NewsContainerModule {}
