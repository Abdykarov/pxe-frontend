import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ProgressPriceOfPowerModule } from 'src/common/containers/progress-price-of-power/progress-price-of-power.module';

// own classes
import { GraphsModule } from 'src/common/ui/graphs/graphs.module';
import { GraphsPageComponent } from 'src/static/organisms/graphs/page';

@NgModule({
    declarations: [
        GraphsPageComponent,
    ],
    exports: [
        GraphsPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        GraphsModule,
        ProgressPriceOfPowerModule,
    ],
})
export class GraphsPageModule {}

export const graphsPageRoutes: Routes = [
    {
        path: 'graphs',
        component: GraphsPageComponent,
    },
];
