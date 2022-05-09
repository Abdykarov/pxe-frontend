import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenerateDataLayoutComponent } from './generate-data-layout.component';

const routes = [
    {
        path: ':page',
        component: GenerateDataLayoutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GenerateDataLayoutRouting {}
