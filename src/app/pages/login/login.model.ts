import { IForm } from 'src/common/containers/form/models/form-definition.model';

export enum ILoginState {
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    LOGIN = 'LOGIN',
    LOGIN_AFTER_RESET = 'LOGIN_AFTER_RESET',
    RESET = 'RESET',
    SEND_SMS = 'SEND_SMS',
}

export interface IConfirmationCode {
    confirmationCode: string;
}

export interface IChangePassword {
    currentPassword?: string;
    password: string;
    confirmPassword: string;
}

export interface IFormFieldsLogin {
    loginFormFields: IForm;
    loginSupplyAuthFields: IForm;
    resetPasswordFields: IForm;
    changePasswordFields: IForm;
}
