import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { CardModule } from 'src/common/ui/card/card.module';
import { DetailComponent } from './detail/detail.component';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
    declarations: [
        BlogComponent,
        DetailComponent,
        OverviewComponent,
    ],
    imports: [
        BlogRoutingModule,
        ButtonModule,
        CardModule,
        CommonModule,
        LayoutContainerModule,
        PipesModule,
    ],
})
export class BlogModule { }
