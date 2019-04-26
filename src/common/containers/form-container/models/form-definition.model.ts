export interface IForm {
    controls: {
        [key: string]: any;
    };
    validationMessages: {
        [key: string]: {
            [key: string]: string;
        };
    };
}

export interface IFieldError {
    [key: string]: string[];
}
