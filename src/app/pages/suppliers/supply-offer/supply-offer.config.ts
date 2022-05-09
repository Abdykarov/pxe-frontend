import { Injectable } from '@angular/core';
import * as R from 'ramda';
import {
    CODE_LIST,
    CONSTS,
    DELIVERY_LENGTH_OPTIONS,
    SUBJECT_TYPE_OPTIONS,
} from 'src/app/app.constants';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { PluralPipe } from 'src/common/pipes/common/plurar/plural.pipe';
import { IOfferTableRows } from './models/supply-offer.model';

@Injectable({
    providedIn: 'root',
})
export class SupplyOfferConfig {
    constructor(private pluralPipe: PluralPipe) {}

    public tableCols = (codeLists): IOfferTableRows => ({
        POWER: [
            {
                label: 'Označit',
                contentTemplateHeaderName: 'columnTemplateMarkAll',
                views: [
                    {
                        contentTemplateName: 'columnTemplateMark',
                    },
                ],
            },
            {
                label: 'Název produktu',
                views: [
                    {
                        headingClass: ['product-name-min-width'],
                        cellClass: ['text-break'],
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
                        content: (row) =>
                            R.find(R.propEq('value', row.subject.code))(
                                SUBJECT_TYPE_OPTIONS
                            ).label,
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
                            return row.distributionLocation
                                ? R.find(
                                      R.propEq(
                                          'value',
                                          row.distributionLocation.code
                                      )
                                  )(codeLists[CODE_LIST.DISTRIBUTION_POWER])
                                      .label
                                : '';
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
                            return row.distributionRate
                                ? R.find(
                                      R.propEq(
                                          'value',
                                          row.distributionRate.code
                                      )
                                  )(codeLists[CODE_LIST.DIST_RATE]).label
                                : '';
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
                            return row.circuitBreaker
                                ? R.find(
                                      R.propEq('value', row.circuitBreaker.code)
                                  )(codeLists[CODE_LIST.CIRCUIT_BREAKER]).label
                                : '';
                        },
                    },
                ],
            },
            {
                label: 'Cena za VT',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: ['text-right'],
                        contentTemplateName: 'columnTemplatePriceVT',
                    },
                ],
            },
            {
                label: 'Cena za NT',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: ['text-right'],
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
                        content: (row) =>
                            R.find(R.propEq('value', row.deliveryLength))(
                                DELIVERY_LENGTH_OPTIONS
                            ).label,
                    },
                ],
            },
            {
                label: 'Stálá platba',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: [
                            'text-right',
                            'table--advanced__action-area',
                        ],
                        contentTemplateName: 'actionColumnTemplate',
                    },
                ],
            },
        ],
        GAS: [
            {
                label: 'Označit',
                contentTemplateHeaderName: 'columnTemplateMarkAll',
                views: [
                    {
                        contentTemplateName: 'columnTemplateMark',
                    },
                ],
            },
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
                        content: (row) =>
                            R.find(R.propEq('value', row.subject.code))(
                                SUBJECT_TYPE_OPTIONS
                            ).label,
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
                            return row.distributionLocation
                                ? R.find(
                                      R.propEq(
                                          'value',
                                          row.distributionLocation.code
                                      )
                                  )(codeLists[CODE_LIST.DISTRIBUTION_GAS]).label
                                : '';
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
                        content: (row) => {
                            return row.annualConsumption
                                ? R.find(
                                      R.propEq(
                                          'value',
                                          row.annualConsumption.code
                                      )
                                  )(codeLists[CODE_LIST.CONSUMPTION]).label
                                : '';
                        },
                    },
                ],
            },
            {
                label: 'Cena',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: ['text-right'],
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
                        content: (row) =>
                            R.find(R.propEq('value', row.deliveryLength))(
                                DELIVERY_LENGTH_OPTIONS
                            ).label,
                    },
                ],
            },
            {
                label: 'Stálá platba',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: [
                            'text-right',
                            'table--advanced__action-area',
                        ],
                        contentTemplateName: 'actionColumnTemplate',
                    },
                ],
            },
        ],
    });

    public confirmDeleteOfferConfig = (data): IShowModal => ({
        component: 'ConfirmModalComponent',
        modalType: CONSTS.MODAL_TYPE.CONFIRM_DELETE_OFFER,
        instanceData: {
            confirmText: `Opravdu chcete smazat nabídku <strong>${data.currentOfferFormValues.name}</strong>?`,
            titleConfirm: 'ANO SMAZAT',
            data,
        },
    });

    public confirmCancelOfferConfig = (data): IShowModal => {
        const name = data.currentOfferFormValues.name
            ? data.currentOfferFormValues.name
            : '';
        const space = name ? ' ' : '';
        return {
            component: 'ConfirmModalComponent',
            modalType: CONSTS.MODAL_TYPE.CONFIRM_CANCEL_OFFER,
            instanceData: {
                confirmText: `Opravdu chcete zrušit vytváření nabídky<strong>${space}${name}</strong>?`,
                titleConfirm: 'ANO ZRUŠIT',
                data,
            },
        };
    };

    public confirmDeleteMarkedConfig = (
        numberOfOffers = 0,
        commodityType: CommodityType
    ): IShowModal => {
        return {
            component: 'ConfirmModalComponent',
            modalType: CONSTS.MODAL_TYPE.CONFIRM_DELETE_MARKED,
            instanceData: {
                confirmText: `Opravdu chcete odstranit ${numberOfOffers} ${this.pluralPipe.transform(
                    numberOfOffers,
                    'offer_delete'
                )}
                        ${
                            commodityType === CommodityType.GAS
                                ? 'plynu'
                                : 'elektřiny'
                        }?`,
                titleConfirm: 'ANO',
            },
        };
    };

    public confirmInfo = (isCreateAction: Boolean): IShowModal => ({
        component: 'ConfirmModalComponent',
        modalType: CONSTS.MODAL_TYPE.CONFIRM_INFO_OFFER,
        instanceData: {
            confirmText: `Nabídka byla úspěšně ${
                isCreateAction ? 'přidána' : 'upravena'
            }.`,
            titleConfirm: 'OK',
            showClose: false,
            showCloseButton: false,
        },
        withoutScroll: true,
    });
}
