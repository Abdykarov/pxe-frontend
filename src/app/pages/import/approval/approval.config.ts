import { Injectable } from '@angular/core';

import * as R from 'ramda';

import {
    CODE_LIST,
    CONSTS,
    DELIVERY_LENGTH_OPTIONS,
    SUBJECT_TYPE_OPTIONS,
} from 'src/app/app.constants';
import { IOfferImportInput } from 'src/app/pages/import/import.model';
import { IOfferTableRows } from 'src/app/pages/supply-offer/models/supply-offer.model';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';

@Injectable({
    providedIn: 'root',
})
export class ApprovalConfig {
    public tableCols = (codeLists): IOfferTableRows => ({
        POWER: [
            {
                label: '',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateGreenEnergy',
                    },
                ],
            },
            {
                label: 'Název produktu',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.offerInput.name}`,
                    },
                ],
            },
            {
                label: 'Odběratel',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) =>
                            `${R.find(R.propEq('value', row.offerInput.subjectTypeId))(SUBJECT_TYPE_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => {
                            return row.offerInput.distributionLocation ?
                                R.find(R.propEq('value', row.offerInput.distributionLocation))
                                    (codeLists[CODE_LIST.DISTRIBUTION_POWER]).label :
                                    '';
                        },
                    },
                ],
            },
            {
                label: 'Distribuční sazba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => {
                            return row.offerInput.powerAttributes.distributionRateId ?
                                R.find(R.propEq('value', row.offerInput.powerAttributes.distributionRateId))
                                (codeLists[CODE_LIST.DIST_RATE]).label :
                                '';
                        },

                    },
                ],
            },
            {
                label: 'Jistič',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => {
                            return row.offerInput.powerAttributes.circuitBreakerId ?
                                R.find(R.propEq('value', row.offerInput.powerAttributes.circuitBreakerId))
                                (codeLists[CODE_LIST.CIRCUIT_BREAKER]).label :
                                '';
                        },

                    },
                ],
            },
            {
                label: 'Cena za VT',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right'],
                        contentTemplateName: 'columnTemplatePriceVT',
                    },
                ],
            },
            {
                label: 'Cena za NT',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right'],
                        contentTemplateName: 'columnTemplatePriceNT',
                    },
                ],
            },
            {
                label: 'Platnost',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateValidFromTo',
                    },
                ],
            },
            {
                label: 'Dodávkové období',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateDeliveryFromTo',
                    },
                ],
            },
            {
                label: 'Délka dodávky',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) =>
                            `${R.find(R.propEq('value', row.offerInput.deliveryLength))(DELIVERY_LENGTH_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Stálá platba',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right', 'table--advanced__action-area'],
                        contentTemplateName: 'actionColumnTemplate',
                    },
                ],
            },
        ],
        GAS: [
            {
                label: '',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateGreenEnergy',
                    },
                ],
            },
            {
                label: 'Název produktu',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => `${row.offerInput.name}`,
                    },
                ],
            },
            {
                label: 'Odběratel',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) =>
                            `${R.find(R.propEq('value', row.offerInput.subjectTypeId))(SUBJECT_TYPE_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => {
                            return row.offerInput.distributionLocation ?
                                R.find(R.propEq('value', row.offerInput.distributionLocation))
                                (codeLists[CODE_LIST.DISTRIBUTION_POWER]).label :
                                '';
                        },
                    },
                ],
            },
            {
                label: 'Spotřeba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => {
                            return row.offerInput.gasAttributes.annualConsumptionId ?
                                R.find(R.propEq('value', row.offerInput.gasAttributes.annualConsumptionId))
                                (codeLists[CODE_LIST.CONSUMPTION]).label :
                                '';
                        },
                    },
                ],
            },
            {
                label: 'Cena',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right'],
                        contentTemplateName: 'columnTemplatePriceGas',
                    },
                ],
            },
            {
                label: 'Platnost',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateValidFromTo',
                    },
                ],
            },
            {
                label: 'Dodávkové období',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateDeliveryFromTo',
                    },
                ],
            },
            {
                label: 'Délka dodávky',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) =>
                            `${R.find(R.propEq('value', row.offerInput.deliveryLength))(DELIVERY_LENGTH_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Stálá platba',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right', 'table--advanced__action-area'],
                        contentTemplateName: 'actionColumnTemplate',
                    },
                ],
            },
        ],
    })

    public confirmBackActionConfig = (): IShowModal => ({
        component: 'ConfirmModalComponent',
        modalType: CONSTS.MODAL_TYPE.CONFIRM_BACK_IMPORT,
        instanceData: {
            confirmText: `Vrácením o krok zpět ztratíte nahrané nabídky.<br />Opravdu chcete pokračovat?`,
            titleConfirm: 'Ano',
            titleClose: 'Ne',
            size: 'xl',
        },
    })
}
