import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { environment } from 'src/environments/environment';
import { TypographyPageModule , typographyPageRoutes } from './atoms/typography/page.module';
import { BannersPageModule , bannersPageRoutes } from './atoms/banners/page.module';
import { AddPageModule , addPageRoutes } from './atoms/add/page.module';
import { AccordionPageModule , accordionPageRoutes } from './atoms/accordion/page.module';
import { AlertsPageModule , alertsPageRoutes } from './atoms/alerts/page.module';
import { BreadcrumbPageModule , breadcrumbPageRoutes } from './organisms/breadcrumb/page.module';
import { ButtonsPageModule , buttonsPageRoutes } from './atoms/buttons/page.module';
import { CardPageModule , cardPageRoutes } from './atoms/card/page.module';
import { DropdownPageModule , dropdownPageRoutes } from './atoms/dropdown/page.module';
import { FormsPageModule , formsPageRoutes } from './atoms/forms/page.module';
import { IconsPageModule , iconsPageRoutes } from './atoms/icons/page.module';
import { IndicatorsPageModule , indicatorsPageRoutes } from './atoms/indicators/page.module';
import { PlaceloaderPageModule , placeloaderPageRoutes } from './atoms/placeloader/page.module';
import { TablesPageModule , tablesPageRoutes } from './atoms/tables/page.module';
import { TipsPageModule , tipsPageRoutes } from './atoms/tips/page.module';
import { TabsPageModule , tabsPageRoutes } from './atoms/tabs/page.module';
import { PaginationPageModule , paginationPageRoutes } from './atoms/pagination/page.module';
import { ModalsPageModule , modalsPageRoutes } from './organisms/modals/page.module';
import { TooltipPageModule , tooltipPageRoutes } from './atoms/tooltip/page.module';
import { ColorsPageModule , colorsPageRoutes } from './atoms/colors/page.module';
import { ErrorPageModule , errorPageRoutes } from './pages/error-404/page.module';
import { LandingModule , landingPageRoutes } from './pages/landing/landing.module';


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
    ...errorPageRoutes,
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
    ...landingPageRoutes,
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
        ErrorPageModule,
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
        LandingModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class StaticRoutingModule {}
