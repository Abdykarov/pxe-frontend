export interface IOption {
    key: string | number | false;
    value?: string | number | object | false;
    disabled?: boolean;
    label?: string;
}
