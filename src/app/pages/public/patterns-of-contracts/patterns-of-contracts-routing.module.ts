import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { PatternsOfContractsComponent } from 'src/app/pages/public/patterns-of-contracts/patterns-of-contracts.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: PatternsOfContractsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PatternsOfContractsRoutingModule {}
