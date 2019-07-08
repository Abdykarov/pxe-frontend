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
    BadgesPageModule,
    badgesPageRoutes,
} from 'src/static/atoms/badges/page.module';
import {
    BannersPageModule,
    bannersPageRoutes,
} from 'src/static/atoms/banners/page.module';
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
    ContractSigningPageModule,
    contractSigningPageRoutes,
} from 'src/static/pages/contract-signing/page.module';
import {
    DropdownPageModule,
    dropdownPageRoutes,
} from 'src/static/atoms/dropdown/page.module';
import {
    FormsPageModule,
    formsPageRoutes,
} from 'src/static/atoms/forms/page.module';
import {
    ChangePasswordBannerPageModule,
    changePasswordBannerPageRoutes,
} from 'src/static/pages/change-password-banner/page.module';
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
    ListSupplyPointsPageModule,
    listSupplyPointsPageRoutes,
} from 'src/static/pages/list-supply-points/page.module';
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
    RecapitulationPageModule,
    recapitulationPageRoutes,
} from 'src/static/pages/recapitulation/page.module';
import {
    RequestBannerPageModule,
    requestBannerPageRoutes,
} from 'src/static/pages/request-banner/page.module';
import {
    RequestCardPageModule,
    requestCardPageRoutes,
} from 'src/static/organisms/request-card/page.module';
import {
    SupplyOfferPageModule,
    supplyOfferPageRoutes,
} from 'src/static/organisms/supply-offer/page.module';
import {
    SupplyPointOfferPageModule,
    supplyPointOfferPageRoutes,
} from 'src/static/organisms/supply-point-offer/page.module';
import {
    SupplyPointOverviewPageModule,
    supplyPointOverviewPageRoutes,
} from 'src/static/organisms/supply-point-overview/page.module';
import {
    SupplyPointPageModule,
    supplyPointPageRoutes,
} from 'src/static/organisms/supply-point/page.module';
import {
    SupplyPointsBannerPageModule,
    supplyPointsBannerPageRoutes,
} from 'src/static/pages/supply-points-banner/page.module';
import {
    SupplyPointsDetailPageModule,
    supplyPointsDetailPageRoutes,
} from 'src/static/pages/supply-points-detail/page.module';
import {
    SupplyPointsOfferPageModule,
    supplyPointsOfferPageRoutes,
} from 'src/static/pages/supply-points-offer/page.module';
import {
    SupplyPointsPageModule,
    supplyPointsPageRoutes,
} from 'src/static/pages/supply-points/page.module';
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
            ...badgesPageRoutes,
            ...bannersPageRoutes,
            ...breadcrumbPageRoutes,
            ...buttonsPageRoutes,
            ...colorsPageRoutes,
            ...contractSigningPageRoutes,
            ...dropdownPageRoutes,
            ...formsPageRoutes,
            ...changePasswordBannerPageRoutes,
            ...iconsPageRoutes,
            ...indicatorsPageRoutes,
            ...infoBannerPageRoutes,
            ...listSupplyPointsPageRoutes,
            ...modalsPageRoutes,
            ...newSupplyPointPageRoutes,
            ...progressBarPageRoutes,
            ...recapitulationPageRoutes,
            ...requestBannerPageRoutes,
            ...requestCardPageRoutes,
            ...supplyOfferPageRoutes,
            ...supplyPointOfferPageRoutes,
            ...supplyPointOverviewPageRoutes,
            ...supplyPointPageRoutes,
            ...supplyPointsBannerPageRoutes,
            ...supplyPointsDetailPageRoutes,
            ...supplyPointsOfferPageRoutes,
            ...supplyPointsPageRoutes,
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
        BadgesPageModule,
        BannersPageModule,
        BreadcrumbPageModule,
        ButtonsPageModule,
        ColorsPageModule,
        ContractSigningPageModule,
        DropdownPageModule,
        FormsPageModule,
        ChangePasswordBannerPageModule,
        IconsPageModule,
        IndicatorsPageModule,
        InfoBannerPageModule,
        ListSupplyPointsPageModule,
        ModalsPageModule,
        NewSupplyPointPageModule,
        ProgressBarPageModule,
        RecapitulationPageModule,
        RequestBannerPageModule,
        RequestCardPageModule,
        RouterModule.forChild(routes),
        SupplyOfferPageModule,
        SupplyPointOfferPageModule,
        SupplyPointOverviewPageModule,
        SupplyPointPageModule,
        SupplyPointsBannerPageModule,
        SupplyPointsDetailPageModule,
        SupplyPointsOfferPageModule,
        SupplyPointsPageModule,
        TablesPageModule,
        TooltipPageModule,
        TypographyPageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class BasicLayoutRoutingModule {}
