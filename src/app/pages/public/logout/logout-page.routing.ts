import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { LogoutPageComponent } from './logout-page.component';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: LogoutPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LogoutPageRoutingModule {}
