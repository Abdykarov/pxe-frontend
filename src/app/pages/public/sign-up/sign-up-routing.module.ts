import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SignUpComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SignUpRoutingModule {}
