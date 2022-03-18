export const enum ContractTypes {
    ACTIVE = 'active',
    HISTORY = 'history',
    FUTURE = 'future',
}

interface LinkToContractType {
    text: string;
    contractType: ContractTypes;
}

export interface LinkToContractTypes extends Array<LinkToContractType> {}
