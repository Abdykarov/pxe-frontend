import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { FaqDetailComponent } from 'src/app/pages/public/faq/faq-detail/faq-detail.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: FaqDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FaqDetailRoutingModule {}
