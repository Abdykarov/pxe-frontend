import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasketComponent} from './basket.component';

const routes: Routes = [
    {
        path: '',
        component: BasketComponent,
        children: [
            {
                path: '',
                loadChildren: './index/index.module#IndexModule',
            },

            {
                path: 'add',
                loadChildren: './add/add.module#AddModule',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BasketRoutingModule { }
