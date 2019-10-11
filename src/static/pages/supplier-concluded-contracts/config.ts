import {
    Inject,
    Injectable,
    LOCALE_ID,
} from '@angular/core';
import { formatDate } from '@angular/common';

import {
    IContractWithNameAndSupplyPointEan,
    IPaginatedContractsWithNameAndSupplyPointEan,
} from 'src/common/graphql/models/suppplier.model';

@Injectable({
    providedIn: 'root',
})
export class SupplierConcludedContractsConfig {
    constructor(
        @Inject(LOCALE_ID) private locale: string,
    ) {}

    public readonly tableCols = [
        {
            label: 'Jméno a příjmení',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: IContractWithNameAndSupplyPointEan) => `${row.name}`,
                },
            ],
        },
        {
            label: 'EAN',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: IContractWithNameAndSupplyPointEan) => `${row.ean}`,
                },
            ],
        },
        {
            label: 'Doba dodávky',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: IContractWithNameAndSupplyPointEan) =>
                        `${formatDate(row.contract.deliveryFrom, 'dd. MM. yyyy', this.locale)} -
                        ${formatDate(row.contract.deliveryTo, 'dd. MM. yyyy', this.locale)}`,
                },
            ],
        },
        {
            label: 'Smlouva',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    contentTemplateName: 'downloadPdfTemplate',
                },
            ],
        },
    ];

    public readonly paginatedContractsWithNameAndSupplyPointEan: IPaginatedContractsWithNameAndSupplyPointEan = {
        contractsWithNameAndEan: [
            {
                name: 'Jaroslav Dvořák',
                ean: '8591',
                contract: {
                    offerValidity: true,
                    deliveryTo: '2021-08-01',
                    deliveryFrom: '2020-08-01',
                    personalData: {
                        name: '',
                        birthDate: '',
                        ico: '',
                        dic: '',
                        address1: null,
                        address2: null,
                        email: '',
                        phone: '',
                        bankAccountNumber: '',
                        bankCode: '',
                        depositPaymentType: {
                            type: '',
                            code: '',
                            description: '',
                            help: '',
                        },
                        deposit: 1000,
                    },
                },
            },
            {
                name: 'Jaroslav Dvořák',
                ean: '8591',
                contract: {
                    offerValidity: true,
                    deliveryTo: '2021-09-01',
                    deliveryFrom: '2020-09-01',
                    personalData: {
                        name: '',
                        birthDate: '',
                        ico: '',
                        dic: '',
                        address1: null,
                        address2: null,
                        email: '',
                        phone: '',
                        bankAccountNumber: '',
                        bankCode: '',
                        depositPaymentType: {
                            type: '',
                            code: '',
                            description: '',
                            help: '',
                        },
                        deposit: 1000,
                    },
                },
            },
        ],
        totalRecords: 1000,
    };
}
