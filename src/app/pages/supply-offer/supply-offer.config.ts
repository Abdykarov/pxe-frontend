import { Injectable } from '@angular/core';

import * as R from 'ramda';

import {
    CODE_LIST,
    DELIVERY_LENGTH_OPTIONS,
    SUBJECT_TYPE_OPTIONS,
} from 'src/app/app.constants';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IOfferTableRows } from './models/supply-pffer.model';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';

@Injectable({
    providedIn: 'root',
})
export class SupplyOfferConfig {

    public confirmDeleteOffer = 'confirmDeleteOffer';
    public confirmCancelOffer = 'confirmCancelOffer';

    public supplyOfferCommodityTypes = {
        power: CommodityType.POWER,
        gas: CommodityType.GAS,
    };

    public tableCols = (codeLists): IOfferTableRows => ({
        POWER: [
            {
                label: 'Název produktu',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.name}`,
                    },
                ],
            },
            {
                label: 'Odběratel',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${R.find(R.propEq('value', row.subject.code))(SUBJECT_TYPE_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => {
                            return row.distributionLocation ?
                                R.find(R.propEq('value', row.distributionLocation.code))(codeLists[CODE_LIST.DISTRIBUTION_POWER]).label :
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
                        content: (row) => {
                            return row.distributionRate ?
                                R.find(R.propEq('value', row.distributionRate.code))(codeLists[CODE_LIST.DIST_RATE]).label :
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
                        content: (row) => {
                            return row.circuitBreaker ?
                                R.find(R.propEq('value', row.circuitBreaker.code))(codeLists[CODE_LIST.CIRCUIT_BREAKER]).label :
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
                        content: (row) => `${R.find(R.propEq('value', row.deliveryLength))(DELIVERY_LENGTH_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Stálá platba - cena',
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
                label: 'Název produktu',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.name}`,
                    },
                ],
            },
            {
                label: 'Odběratel',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${R.find(R.propEq('value', row.subject.code))(SUBJECT_TYPE_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.distributionLocation ? row.distributionLocation.code : ''}`,
                    },
                ],
            },
            {
                label: 'Spotřeba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => {
                            return row.annualConsumption ?
                                R.find(R.propEq('value', row.annualConsumption.code))(codeLists[CODE_LIST.CONSUMPTION]).label :
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
                        content: (row) => `${R.find(R.propEq('value', row.deliveryLength))(DELIVERY_LENGTH_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Stálá platba - cena',
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

    public confirmDeleteOfferConfig = (data): IShowModal => ({
        component: 'ConfirmModalComponent',
        modalType: this.confirmDeleteOffer,
        instanceData: {
            confirmText: `Opravdu chcete smazat nabídku <strong>${data.currentOfferFormValues.name}</strong>?`,
            titleConfirm: 'ANO SMAZAT',
            data,
        },
    })

    public confirmCancelOfferConfig = (data): IShowModal => {
        const name = data.currentOfferFormValues.name ? data.currentOfferFormValues.name : '';
        const space = name ? ' ' : '';
        return {
            component: 'ConfirmModalComponent',
            modalType: this.confirmCancelOffer,
            instanceData: {
                confirmText: `Opravdu chcete zrušit vytváření nabídky<strong>${space}${name}</strong>?`,
                titleConfirm: 'ANO ZRUŠIT',
                data,
            },
        };
    }
}
