export interface IPdfSetting {
    [key: string]: IPdfSettingSubject;
}

interface IPdfSettingSubject {
    [key: string]: IPdfFile;
}

interface IPdfFile {
    sourceSrc: string;
    downloadName: string;
}
