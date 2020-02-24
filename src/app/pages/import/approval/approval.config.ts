import { Injectable } from '@angular/core';

import { CONSTS } from 'src/app/app.constants';
import { IOfferImportInput } from 'src/app/pages/import/import.model';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';

@Injectable({
    providedIn: 'root',
})
export class ApprovalConfig {
    public tableCols = {
        POWER: [
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
                        content: (row: IOfferImportInput) => `${row.offerInput.subjectTypeId}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => `${row.offerInput.distributionLocation}`,
                    },
                ],
            },
            {
                label: 'Distribuční sazba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => `${row.offerInput.distributionLocation}`,
                    },
                ],
            },
            {
                label: 'Jistič',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => `${row.offerInput.powerAttributes.circuitBreakerId}`,
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
                        content: (row: IOfferImportInput) => `${row.offerInput.deliveryLength}`,
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
                        content: (row: IOfferImportInput) => `${row.offerInput.subjectTypeId}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => `${row.offerInput.distributionLocation}`,
                    },
                ],
            },
            {
                label: 'Spotřeba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row: IOfferImportInput) => `${row.offerInput.gasAttributes.annualConsumptionId}`,
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
                        content: (row: IOfferImportInput) => `${row.offerInput.deliveryLength}`,
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
    };

    public confirmBackActionConfig = (data): IShowModal => ({
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
