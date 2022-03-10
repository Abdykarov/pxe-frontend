import {
    ContractTypes,
    LinkToContractTypes,
} from './supply-points-overview-container.model';

export const configLinksToContractTypes: LinkToContractTypes = [
    {
        contractType: ContractTypes.HISTORY,
        text: 'Historické',
    },
    {
        contractType: ContractTypes.ACTIVE,
        text: 'Aktivní',
    },
    {
        contractType: ContractTypes.FUTURE,
        text: 'Budoucí',
    },
];

export const pluralContractType = {
    [ContractTypes.ACTIVE]: 'aktivní',
    [ContractTypes.HISTORY]: 'historickou',
    [ContractTypes.FUTURE]: 'budoucí',
};
