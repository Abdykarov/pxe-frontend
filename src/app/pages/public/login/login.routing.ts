import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: LoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule {}
