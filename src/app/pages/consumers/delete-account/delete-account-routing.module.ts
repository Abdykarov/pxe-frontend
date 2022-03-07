import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { DeleteAccountComponent } from 'src/app/pages/consumers/delete-account/delete-account.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: DeleteAccountComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DeleteAccountRoutingModule {}
