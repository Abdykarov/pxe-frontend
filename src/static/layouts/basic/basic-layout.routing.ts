import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';

import {
    AlertsPageModule,
    alertsPageRoutes,
} from 'src/static/atoms/alerts/page.module';
import {
    BasicLayoutComponent,
} from './basic-layout.component';
import {
    BreadcrumbPageModule,
    breadcrumbPageRoutes,
} from 'src/static/organisms/breadcrumb/page.module';
import {
    ButtonsPageModule,
    buttonsPageRoutes,
} from 'src/static/atoms/buttons/page.module';
import {
    ColorsPageModule,
    colorsPageRoutes,
} from 'src/static/atoms/colors/page.module';
import {
    FormsPageModule,
    formsPageRoutes,
} from 'src/static/atoms/forms/page.module';
import {
    IconsPageModule,
    iconsPageRoutes,
} from 'src/static/atoms/icons/page.module';
import {
    IndicatorsPageModule,
    indicatorsPageRoutes,
} from 'src/static/atoms/indicators/page.module';
import {
    InfoBannerPageModule,
    infoBannerPageRoutes,
} from 'src/static/organisms/info-banner/page.module';
import {
    ModalsPageModule,
    modalsPageRoutes,
} from 'src/static/organisms/modals/page.module';
import {
    NewSupplyPointPageModule,
    newSupplyPointPageRoutes,
} from 'src/static/pages/new-supply-point/page.module';
import {
    ProgressBarPageModule,
    progressBarPageRoutes,
} from 'src/static/organisms/progress-bar/progress-bar.module';
import {
    SupplyPointPageModule,
    supplyPointPageRoutes,
} from 'src/static/organisms/supply-point/page.module';
import {
    SupplyPointsPageModule,
    supplyPointsPageRoutes,
} from 'src/static/pages/supply-points/page.module';
import {
    SupplyPointsBannerPageModule,
    supplyPointsBannerPageRoutes,
} from 'src/static/pages/supply-points-banner/page.module';
import {
    SupplyPointOfferPageModule,
    supplyPointOfferPageRoutes,
} from 'src/static/organisms/supply-point-offer/page.module';
import {
    SupplyPointsOfferPageModule,
    supplyPointsOfferPageRoutes,
} from 'src/static/pages/supply-points-offer/page.module';
import {
    TablesPageModule,
    tablesPageRoutes,
} from 'src/static/atoms/tables/page.module';
import {
    TooltipPageModule,
    tooltipPageRoutes,
} from 'src/static/atoms/tooltip/page.module';
import {
    TypographyPageModule,
    typographyPageRoutes,
} from 'src/static/atoms/typography/page.module';

const routes: Routes = [
    {
        path: '',
        component: BasicLayoutComponent,
        children: [
            ...alertsPageRoutes,
            ...breadcrumbPageRoutes,
            ...buttonsPageRoutes,
            ...colorsPageRoutes,
            ...formsPageRoutes,
            ...iconsPageRoutes,
            ...indicatorsPageRoutes,
            ...infoBannerPageRoutes,
            ...modalsPageRoutes,
            ...newSupplyPointPageRoutes,
            ...progressBarPageRoutes,
            ...supplyPointPageRoutes,
            ...supplyPointsPageRoutes,
            ...supplyPointsBannerPageRoutes,
            ...supplyPointOfferPageRoutes,
            ...supplyPointsOfferPageRoutes,
            ...tablesPageRoutes,
            ...tooltipPageRoutes,
            ...typographyPageRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];

@NgModule({
    imports: [
        AlertsPageModule,
        BreadcrumbPageModule,
        ButtonsPageModule,
        ColorsPageModule,
        FormsPageModule,
        IconsPageModule,
        IndicatorsPageModule,
        InfoBannerPageModule,
        ModalsPageModule,
        NewSupplyPointPageModule,
        ProgressBarPageModule,
        RouterModule.forChild(routes),
        SupplyPointPageModule,
        SupplyPointsPageModule,
        SupplyPointsBannerPageModule,
        SupplyPointOfferPageModule,
        SupplyPointsOfferPageModule,
        TablesPageModule,
        TooltipPageModule,
        TypographyPageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class BasicLayoutRoutingModule {}
