import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { SecuringYourDataComponent } from './securing-your-data.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SecuringYourDataComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SecuringYourDataRoutingModule {}
