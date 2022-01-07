import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { GenerateDataLayoutComponent } from './generate-data-layout.component';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: GenerateDataLayoutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GenerateDataLayoutRouting {}
