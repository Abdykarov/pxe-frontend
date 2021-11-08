import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { ConcludedContractsComponent } from 'src/app/pages/suppliers/concluded-contracts/concluded-contracts.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: ConcludedContractsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConcludedContractsRoutingModule {}
