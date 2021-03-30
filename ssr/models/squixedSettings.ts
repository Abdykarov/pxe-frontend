export interface ISquidexSetting {
    url: string;
}

export interface ISquidexSettings {
    preview: ISquidexSetting;
    test: ISquidexSetting;
    prod: ISquidexSetting;
    grant_type: string;
    client_id: string;
    client_secret: string;
    scope: string;
}
