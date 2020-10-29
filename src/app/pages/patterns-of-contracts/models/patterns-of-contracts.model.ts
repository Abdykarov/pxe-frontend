export interface IPdfSetting {
    [key: string]: IPdfSettingSubject;
}

interface IPdfSettingSubject {
    [key: string]: IPdfFile;
}

export interface IPdfFile {
    sourceUrl: string;
    downloadName: string;
    dateFrom: Date;
    dateTo?: Date;
}
