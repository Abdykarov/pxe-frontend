import {
    CommodityTypesLowerCase,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import { IPdfSetting } from 'src/app/pages/public/patterns-of-contracts/models/patterns-of-contracts.model';

export const pdfSetting: IPdfSetting[] = [
    {
        [SubjectTypeLowerCase.INDIVIDUAL]: {
            [CommodityTypesLowerCase.POWER]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-power-fo.pdf',
                downloadName: 'Vzorová smlouva domácnost - elektřina',
                dateFrom: new Date('2019-11-01'),
                dateTo: new Date('2021-03-29'),
            },
            [CommodityTypesLowerCase.GAS]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-gas-fo.pdf',
                downloadName: 'Vzorová smlouva domácnost - plyn',
                dateFrom: new Date('2019-11-01'),
                dateTo: new Date('2021-03-29'),
            },
        },
        [SubjectTypeLowerCase.BUSINESSMAN]: {
            [CommodityTypesLowerCase.POWER]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-power-po.pdf',
                downloadName: 'Vzorová smlouva firma - elektřina',
                dateFrom: new Date('2019-11-01'),
                dateTo: new Date('2021-03-29'),
            },
            [CommodityTypesLowerCase.GAS]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-gas-po.pdf',
                downloadName: 'Vzorová smlouva firma - plyn',
                dateFrom: new Date('2019-11-01'),
                dateTo: new Date('2021-03-29'),
            },
        },
    },
    {
        [SubjectTypeLowerCase.INDIVIDUAL]: {
            [CommodityTypesLowerCase.POWER]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-power-fo_01-05-2021.pdf',
                downloadName: 'Vzorová smlouva domácnost - elektřina',
                dateFrom: new Date('2021-03-30'),
                dateTo: new Date('2999-01-01'),
            },
            [CommodityTypesLowerCase.GAS]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-gas-fo_01-05-2021.pdf',
                downloadName: 'Vzorová smlouva domácnost - plyn',
                dateFrom: new Date('2021-03-30'),
                dateTo: new Date('2999-01-01'),
            },
        },
        [SubjectTypeLowerCase.BUSINESSMAN]: {
            [CommodityTypesLowerCase.POWER]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-power-po_01-05-2021.pdf',
                downloadName: 'Vzorová smlouva firma - elektřina',
                dateFrom: new Date('2021-03-30'),
                dateTo: new Date('2999-01-01'),
            },
            [CommodityTypesLowerCase.GAS]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-gas-po_01-05-2021.pdf',
                downloadName: 'Vzorová smlouva firma - plyn',
                dateFrom: new Date('2021-03-30'),
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
