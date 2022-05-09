import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: PaymentComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaymentRoutingModule {}
