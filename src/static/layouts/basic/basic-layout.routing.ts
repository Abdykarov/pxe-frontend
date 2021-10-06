import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';

import {
    AccordionPageModule,
    accordionPageRoutes,
} from 'src/static/atoms/accordion/page.module';
import {
    AlertsPageModule,
    alertsPageRoutes,
} from 'src/static/atoms/alerts/page.module';
import {
    AskForOfferFilePageModule,
    askForOfferFilePageRoutes,
} from 'src/static/organisms/ask-for-offer-file-uploader/page.module';
import {
    BadgesPageModule,
    badgesPageRoutes,
} from 'src/static/atoms/badges/page.module';
import {
    BannersPageModule,
    bannersPageRoutes,
} from 'src/static/atoms/banners/page.module';
import {
    ListOfNotificationsPageModule,
    listOfNotificationsPageRoutes,
} from 'src/static/organisms/list-of-notifications/page.module';
import {
    SignboardPageModule,
    signboardPageRoutes,
} from 'src/static/pages/signboard/page.module';
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
    CardPageModule,
    cardPageRoutes,
} from 'src/static/atoms/card/page.module';
import {
    ColorsPageModule,
    colorsPageRoutes,
} from 'src/static/atoms/colors/page.module';
import {
    ContractSigningPageModule,
    contractSigningPageRoutes,
} from 'src/static/pages/contract-signing/page.module';
import {
    DashboardPageModule,
    dashboardPageRoutes,
} from 'src/static/pages/dashboard/page.module';
import {
    deleteAccountOkWithPhonePageRoutes,
    DeleteAccountOkWithPhonePageModule,
} from 'src/static/pages/delete-account-ok-with-phone/page.module';
import {
    deleteAccountOkSimplePageRoutes,
    DeleteAccountOkSimplePageModule,
} from 'src/static/pages/delete-account-ok-simple/page.module';
import {
    deleteAccountFailedPageRoutes,
    DeleteAccountFailedPageModule,
} from 'src/static/pages/delete-account-failed/page.module';
import {
    DropdownPageModule,
    dropdownPageRoutes,
} from 'src/static/atoms/dropdown/page.module';
import {
    FormsPageModule,
    formsPageRoutes,
} from 'src/static/atoms/forms/page.module';
import {
    graphsPageRoutes,
    GraphsPageModule,
} from 'src/static/organisms/graphs/page.module';
import {
    ChangePasswordBannerPageModule,
    changePasswordBannerPageRoutes,
} from 'src/static/pages/change-password-banner/page.module';
import {
    IconsPageModule,
    iconsPageRoutes,
} from 'src/static/atoms/icons/page.module';
import {
    ImportUploadPageModule,
    importUploadPageRoutes,
} from 'src/static/pages/import-upload/page.module';
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
    LoaderPageModule,
    loaderPageRoutes,
} from 'src/static/atoms/loader/page.module';
import {
    HistoryModule,
    historyRoutes,
} from 'src/static/pages/history/page.module';
import {
    HistoryDetailModule,
    historyDetailPageRoutes,
} from 'src/static/pages/history-detail/page.module';
import {
    ModalsPageModule,
    modalsPageRoutes,
} from 'src/static/organisms/modals/page.module';
import {
    NewsPageModule,
    newsPageRoutes,
} from 'src/static/organisms/news/page.module';
import {
    NewSupplyPointPageModule,
    newSupplyPointPageRoutes,
} from 'src/static/pages/new-supply-point/page.module';
import {
    microTablePageRoutes,
    MicroTablePageModule,
} from 'src/static/atoms/micro-table/page.module';
import {
    PaginationPageModule,
    paginationPageRoutes,
} from 'src/static/atoms/pagination/page.module';
import {
    PaymentVerificationPageModule,
    paymentVerificationPageRoutes,
} from 'src/static/pages/payment-verification/page.module';
import {
    ProgressBarPageModule,
    progressBarPageRoutes,
} from 'src/static/organisms/progress-bar/progress-bar.module';
import {
    RecapitulationPageModule,
    recapitulationPageRoutes,
} from 'src/static/pages/recapitulation/page.module';
import {
    RequestPageModule,
    requestPageRoutes,
} from 'src/static/pages/request/page.module';
import {
    RequestBannerPageModule,
    requestBannerPageRoutes,
} from 'src/static/pages/request-banner/page.module';
import {
    RequestCardPageModule,
    requestCardPageRoutes,
} from 'src/static/organisms/request-card/page.module';
import {
    SupplierConcludedContractsEmptyModule,
    supplierConcludedContractsEmptyRoutes,
} from 'src/static/pages/supplier-concluded-contracts-empty/page.module';
import {
    SupplierConcludedContractsModule,
    supplierConcludedContractsRoutes,
} from 'src/static/pages/supplier-concluded-contracts/page.module';
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
import {
    UserProfilePageModule,
    userProfilePageRoutes,
} from 'src/static/pages/user-profile/page.module';
import {
    UserProfileChangePasswordPageModule,
    userProfileChangePasswordPageRoutes,
} from 'src/static/pages/user-profile-change-password/page.module';

const routes: Routes = [
    {
        path: '',
        component: BasicLayoutComponent,
        children: [
            ...accordionPageRoutes,
            ...alertsPageRoutes,
            ...askForOfferFilePageRoutes,
            ...badgesPageRoutes,
            ...bannersPageRoutes,
            ...breadcrumbPageRoutes,
            ...buttonsPageRoutes,
            ...cardPageRoutes,
            ...colorsPageRoutes,
            ...contractSigningPageRoutes,
            ...dashboardPageRoutes,
            ...deleteAccountFailedPageRoutes,
            ...deleteAccountOkSimplePageRoutes,
            ...deleteAccountOkWithPhonePageRoutes,
            ...dropdownPageRoutes,
            ...formsPageRoutes,
            ...graphsPageRoutes,
            ...historyRoutes,
            ...historyDetailPageRoutes,
            ...changePasswordBannerPageRoutes,
            ...iconsPageRoutes,
            ...importUploadPageRoutes,
            ...indicatorsPageRoutes,
            ...infoBannerPageRoutes,
            ...listOfNotificationsPageRoutes,
            ...listSupplyPointsPageRoutes,
            ...loaderPageRoutes,
            ...modalsPageRoutes,
            ...microTablePageRoutes,
            ...newsPageRoutes,
            ...newSupplyPointPageRoutes,
            ...paginationPageRoutes,
            ...paymentVerificationPageRoutes,
            ...progressBarPageRoutes,
            ...recapitulationPageRoutes,
            ...requestPageRoutes,
            ...requestBannerPageRoutes,
            ...requestCardPageRoutes,
            ...signboardPageRoutes,
            ...supplierConcludedContractsEmptyRoutes,
            ...supplierConcludedContractsRoutes,
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
            ...userProfilePageRoutes,
            ...userProfileChangePasswordPageRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];

@NgModule({
    imports: [
        AccordionPageModule,
        AlertsPageModule,
        AskForOfferFilePageModule,
        BadgesPageModule,
        BannersPageModule,
        BreadcrumbPageModule,
        ButtonsPageModule,
        CardPageModule,
        ColorsPageModule,
        ContractSigningPageModule,
        DeleteAccountFailedPageModule,
        DeleteAccountOkSimplePageModule,
        DeleteAccountOkWithPhonePageModule,
        DashboardPageModule,
        DropdownPageModule,
        FormsPageModule,
        GraphsPageModule,
        HistoryModule,
        HistoryDetailModule,
        ChangePasswordBannerPageModule,
        IconsPageModule,
        ImportUploadPageModule,
        IndicatorsPageModule,
        InfoBannerPageModule,
        ListOfNotificationsPageModule,
        ListSupplyPointsPageModule,
        LoaderPageModule,
        MicroTablePageModule,
        ModalsPageModule,
        NewsPageModule,
        NewSupplyPointPageModule,
        PaginationPageModule,
        PaymentVerificationPageModule,
        ProgressBarPageModule,
        RecapitulationPageModule,
        RequestPageModule,
        RequestBannerPageModule,
        RequestCardPageModule,
        RouterModule.forChild(routes),
        SignboardPageModule,
        SupplierConcludedContractsEmptyModule,
        SupplierConcludedContractsModule,
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
        UserProfilePageModule,
        UserProfileChangePasswordPageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class BasicLayoutRoutingModule {}
