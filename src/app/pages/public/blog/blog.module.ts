import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DetailComponent } from './detail/detail.component';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
    declarations: [
        BlogComponent,
        OverviewComponent,
        DetailComponent,
    ],
    imports: [
        BlogRoutingModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        PipesModule,
    ],
})
export class BlogModule { }
