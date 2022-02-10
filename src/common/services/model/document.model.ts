export interface IResponseDataDocument {
    file: Blob;
    filename: string;
}

export enum DocumentType {
    INFORMATION = 'INFORMATION',
    CONTRACT_NOT_EXTENDED = 'CONTRACT_NOT_EXTENDED',
    UNSET_PROLONGATION = 'UNSET_PROLONGATION',
    DENUNCIATION = 'DENUNCIATION',
    WITHDRAWAL = 'WITHDRAWAL',
    CONTRACT = 'CONTRACT',
}
