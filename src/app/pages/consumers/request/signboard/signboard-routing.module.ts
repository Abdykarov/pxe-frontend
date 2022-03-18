import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { SignboardComponent } from 'src/app/pages/consumers/request/signboard/signboard.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SignboardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SignboardRoutingModule {}
