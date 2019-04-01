import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasketComponent} from '../basket.component';
import {AddComponent} from './add.component';

const routes: Routes = [
    {
        path: '',
        component: AddComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddRoutingModule { }
