import {
    CommodityTypesCsLowerCase,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import { IPdfSetting } from 'src/app/pages/public/patterns-of-contracts/models/patterns-of-contracts.model';

export const pdfSetting: IPdfSetting[] = [
    {
        [SubjectTypeLowerCase.INDIVIDUAL]: {
            [CommodityTypesCsLowerCase.POWER]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-power-fo.pdf',
                downloadName: 'Vzorová smlouva domácnost - elektřina',
                dateFrom: new Date('2019-11-01'),
                dateTo: new Date('2021-04-30'),
            },
            [CommodityTypesCsLowerCase.GAS]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-gas-fo.pdf',
                downloadName: 'Vzorová smlouva domácnost - plyn',
                dateFrom: new Date('2019-11-01'),
                dateTo: new Date('2021-04-30'),
            },
        },
        [SubjectTypeLowerCase.BUSINESSMAN]: {
            [CommodityTypesCsLowerCase.POWER]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-power-po.pdf',
                downloadName: 'Vzorová smlouva firma - elektřina',
                dateFrom: new Date('2019-11-01'),
                dateTo: new Date('2021-04-30'),
            },
            [CommodityTypesCsLowerCase.GAS]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-gas-po.pdf',
                downloadName: 'Vzorová smlouva firma - plyn',
                dateFrom: new Date('2019-11-01'),
                dateTo: new Date('2021-04-30'),
            },
        },
    },
    {
        [SubjectTypeLowerCase.INDIVIDUAL]: {
            [CommodityTypesCsLowerCase.POWER]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-power-fo_01-05-2021.pdf',
                downloadName: 'Vzorová smlouva domácnost - elektřina',
                dateFrom: new Date('2021-05-01'),
                dateTo: new Date('2021-10-20'),
            },
            [CommodityTypesCsLowerCase.GAS]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-gas-fo_01-05-2021.pdf',
                downloadName: 'Vzorová smlouva domácnost - plyn',
                dateFrom: new Date('2021-05-01'),
                dateTo: new Date('2021-10-20'),
            },
        },
        [SubjectTypeLowerCase.BUSINESSMAN]: {
            [CommodityTypesCsLowerCase.POWER]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-power-po_01-05-2021.pdf',
                downloadName: 'Vzorová smlouva firma - elektřina',
                dateFrom: new Date('2021-05-01'),
                dateTo: new Date('2021-10-20'),
            },
            [CommodityTypesCsLowerCase.GAS]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-gas-po_01-05-2021.pdf',
                downloadName: 'Vzorová smlouva firma - plyn',
                dateFrom: new Date('2021-05-01'),
                dateTo: new Date('2021-10-20'),
            },
        },
    },
    {
        [SubjectTypeLowerCase.INDIVIDUAL]: {
            [CommodityTypesCsLowerCase.POWER]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-power-fo_21-10-2021.pdf',
                downloadName: 'Vzorová smlouva domácnost - elektřina',
                dateFrom: new Date('2021-10-21'),
                dateTo: new Date('2022-02-15'),
            },
            [CommodityTypesCsLowerCase.GAS]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-gas-fo_21-10-2021.pdf',
                downloadName: 'Vzorová smlouva domácnost - plyn',
                dateFrom: new Date('2021-10-21'),
                dateTo: new Date('2022-02-15'),
            },
        },
        [SubjectTypeLowerCase.BUSINESSMAN]: {
            [CommodityTypesCsLowerCase.POWER]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-power-po_21-10-2021.pdf',
                downloadName: 'Vzorová smlouva firma - elektřina',
                dateFrom: new Date('2021-10-21'),
                dateTo: new Date('2022-02-15'),
            },
            [CommodityTypesCsLowerCase.GAS]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-gas-po_21-10-2021.pdf',
                downloadName: 'Vzorová smlouva firma - plyn',
                dateFrom: new Date('2021-10-21'),
                dateTo: new Date('2022-02-15'),
            },
        },
    },
    {
        [SubjectTypeLowerCase.INDIVIDUAL]: {
            [CommodityTypesCsLowerCase.POWER]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-power-fo_16-2-2022.pdf',
                downloadName: 'Vzorová smlouva domácnost - elektřina',
                dateFrom: new Date('2022-02-16'),
                dateTo: new Date('2999-01-01'),
            },
            [CommodityTypesCsLowerCase.GAS]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-gas-fo_16-2-2022.pdf',
                downloadName: 'Vzorová smlouva domácnost - plyn',
                dateFrom: new Date('2022-02-16'),
                dateTo: new Date('2999-01-01'),
            },
        },
        [SubjectTypeLowerCase.BUSINESSMAN]: {
            [CommodityTypesCsLowerCase.POWER]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-power-po_16-2-2022.pdf',
                downloadName: 'Vzorová smlouva firma - elektřina',
                dateFrom: new Date('2022-02-16'),
                dateTo: new Date('2999-01-01'),
            },
            [CommodityTypesCsLowerCase.GAS]: {
                sourceUrl:
                    '/assets/pdfs/patterns-of-contracts/contract-gas-po_16-2-2022.pdf',
                downloadName: 'Vzorová smlouva firma - plyn',
                dateFrom: new Date('2022-02-16'),
                dateTo: new Date('2999-01-01'),
            },
        },
    },
];

export const historyColConfig = [
    {
        views: [
            {
                contentTemplateName: 'columnTemplateDownloadText',
            },
        ],
    },
    {
        views: [
            {
                contentTemplateName: 'columnTemplateDownload',
                cellClass: 'text-right',
            },
        ],
    },
];
