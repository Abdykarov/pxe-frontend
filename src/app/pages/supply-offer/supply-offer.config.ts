import { Injectable } from '@angular/core';

import * as R from 'ramda';

import {
    ANNUAL_CONSUMPTION_OPTIONS,
    DELIVERY_LENGTH_OPTIONS,
    SUBJECT_TYPE_OPTIONS,
} from 'src/app/app.constants';
import { CommodityType } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class SupplyOfferConfig {
    public tableCols = {
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
                label: 'Typ osoby',
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
                label: 'Cena&nbsp;VT (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplatePriceVT',
                    },
                ],
            },
            {
                label: 'Cena&nbsp;NT (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
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
                label: 'Stálá platba - cena (Kč)',
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
                label: 'Typ osoby',
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
                                `${R.find(R.propEq('value', row.annualConsumption.code))(ANNUAL_CONSUMPTION_OPTIONS).label}` : '';
                        },
                    },
                ],
            },
            {
                label: 'Cena (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
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
                label: 'Stálá platba - cena (Kč)',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right', 'table--advanced__action-area'],
                        contentTemplateName: 'actionColumnTemplate',
                    },
                ],
            },
        ],
    };

    public supplyOfferCommodityTypes = {
        power: CommodityType.POWER,
        gas: CommodityType.GAS,
    };
}
