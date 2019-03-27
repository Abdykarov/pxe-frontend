import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';
import { environment } from 'src/environments/environment';

import { AccordionPageModule, accordionPageRoutes } from './pages/accordion/page.module';
import { AddPageModule, addPageRoutes } from './pages/add/page.module';
import { AlertsPageModule, alertsPageRoutes } from './pages/alerts/page.module';
import { BannersPageModule, bannersPageRoutes } from './pages/banners/page.module';
import { BreadcrumbPageModule, breadcrumbPageRoutes } from './pages/breadcrumb/page.module';
import { ButtonsPageModule, buttonsPageRoutes } from './pages/buttons/page.module';
import { CardPageModule, cardPageRoutes } from './pages/card/page.module';
import { ColorsPageModule, colorsPageRoutes } from './pages/colors/page.module';
import { DropdownPageModule, dropdownPageRoutes } from './pages/dropdown/page.module';
import { ErrorPagePageModule, errorPagePageRoutes } from './pages/error-page-404/page.module';
import { FormsPageModule, formsPageRoutes } from './pages/forms/page.module';
import { IconsPageModule, iconsPageRoutes } from './pages/icons/page.module';
import { IndicatorsPageModule, indicatorsPageRoutes } from './pages/indicators/page.module';
import { ModalsPageModule, modalsPageRoutes } from './pages/modals/page.module';
import { PaginationPageModule, paginationPageRoutes } from './pages/pagination/page.module';
import { PlaceloaderPageModule, placeloaderPageRoutes } from './pages/placeloader/page.module';
import { TablesPageModule, tablesPageRoutes } from './pages/tables/page.module';
import { TabsPageModule, tabsPageRoutes } from './pages/tabs/page.module';
import { TipsPageModule, tipsPageRoutes } from './pages/tips/page.module';
import { TooltipPageModule, tooltipPageRoutes } from './pages/tooltip/page.module';
import { TypographyPageModule, typographyPageRoutes } from './pages/typography/page.module';

const routes: Routes = [
    ...accordionPageRoutes,
    ...addPageRoutes,
    ...alertsPageRoutes,
    ...bannersPageRoutes,
    ...breadcrumbPageRoutes,
    ...buttonsPageRoutes,
    ...cardPageRoutes,
    ...colorsPageRoutes,
    ...dropdownPageRoutes,
    ...errorPagePageRoutes,
    ...formsPageRoutes,
    ...iconsPageRoutes,
    ...indicatorsPageRoutes,
    ...modalsPageRoutes,
    ...paginationPageRoutes,
    ...placeloaderPageRoutes,
    ...tablesPageRoutes,
    ...tabsPageRoutes,
    ...tipsPageRoutes,
    ...tooltipPageRoutes,
    ...typographyPageRoutes,
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                enableTracing: !environment.production,
            },
        ),
        AccordionPageModule,
        AddPageModule,
        AlertsPageModule,
        BannersPageModule,
        BreadcrumbPageModule,
        ButtonsPageModule,
        CardPageModule,
        ColorsPageModule,
        DropdownPageModule,
        ErrorPagePageModule,
        FormsPageModule,
        IconsPageModule,
        IndicatorsPageModule,
        ModalsPageModule,
        PaginationPageModule,
        PlaceloaderPageModule,
        TablesPageModule,
        TabsPageModule,
        TipsPageModule,
        TooltipPageModule,
        TypographyPageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class StaticRoutingModule {}
