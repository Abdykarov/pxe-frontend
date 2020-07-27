export interface IResponseDataDocument {
    file: Blob;
    filename: string;
}

export enum IDocumentType {
    INFORMATION = 'INFORMATION',
    TERMINATE_PREV = 'TERMINATE_PREV',
    UNSET_PROLONGATION = 'UNSET_PROLONGATION',
    DENUNCIATION = 'DENUNCIATION',
    WITHDRAWAL = 'WITHDRAWAL',
    CONTRACT = 'CONTRACT',
}
