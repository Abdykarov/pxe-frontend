import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

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
        GraphsModule,
        CommonModule,
    ],
})
export class GraphsPageModule {}

export const graphsPageRoutes: Routes = [
    {
        path: 'graphs',
        component: GraphsPageComponent,
    },
];
