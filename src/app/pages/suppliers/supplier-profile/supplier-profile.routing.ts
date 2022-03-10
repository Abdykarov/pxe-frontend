import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { SupplierProfileComponent } from 'src/app/pages/suppliers/supplier-profile/supplier-profile.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SupplierProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SupplierProfileRouting {}
