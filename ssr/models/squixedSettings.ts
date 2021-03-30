export interface ISquidexSetting {
    url: string;
}

export interface ISquidexSettings {
    preview: ISquidexSetting;
    test: ISquidexSetting;
    prod: ISquidexSetting;
}
