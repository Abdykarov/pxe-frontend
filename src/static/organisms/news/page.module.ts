import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { NewsModule } from 'src/common/ui/news/news.module';
import { NewsPageComponent } from 'src/static/organisms/news/page';

@NgModule({
    declarations: [
        NewsPageComponent ,
    ],
    exports: [
        NewsPageComponent ,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        NewsModule,
    ],
})
export class NewsPageModule {}

export const newsPageRoutes: Routes = [
    {
        path: 'news',
        component: NewsPageComponent ,
        data: {
            isPublic: false,
        },
    },
];
