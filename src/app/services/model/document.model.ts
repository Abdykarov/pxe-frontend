export interface IResponseDataDocument {
    file: Blob;
    filename: string;
}

export enum IDocumentType {
    INFORMATION = 'INFORMATION',
    VYPOVED_PREV = 'VYPOVED_PREV',
    UNSET_PROLONGATION = 'UNSET_PROLONGATION',
    DENUNCIATION = 'DENUNCIATION',
    WITHDRAWAL = 'WITHDRAWAL',
    CONTRACT = 'CONTRACT',
}
