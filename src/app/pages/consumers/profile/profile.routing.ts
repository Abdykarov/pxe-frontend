import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { ProfileComponent } from 'src/app/pages/consumers/profile/profile.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: ProfileComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRouting {}
