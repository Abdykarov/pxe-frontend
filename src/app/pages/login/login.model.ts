import { changePasswordFields } from 'src/common/containers/form/forms/change-password/change-password-form.config';
import { emailFormFields } from 'src/common/containers/form/forms/reset-password/reset-password-form.config';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import {
    loginFormFields,
    loginSupplyAuthFormFields,
} from 'src/common/containers/form/forms/login/login-form.config';

export enum ILoginState {
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    LOGIN = 'LOGIN',
    LOGIN_AFTER_RESET = 'LOGIN_AFTER_RESET',
    RESET = 'RESET',
    SEND_SMS = 'SEND_SMS',
}

export interface IResetPassword {
    password: string;
}

export interface IChangePassword {
    password: string;
    confirmPassword: string;
}

export interface IFormFieldsLogin {
    loginFormFields: IForm;
    loginSupplyAuthFields: IForm;
    resetPassowordFields: IForm;
    changePassowordFields: IForm;
}

export const formFieldsLogin: IFormFieldsLogin = {
    loginFormFields: loginFormFields,
    loginSupplyAuthFields: loginSupplyAuthFormFields,
    resetPassowordFields: emailFormFields,
    changePassowordFields: changePasswordFields,
};

export const LOGIN_STATE = {
    CHANGE_PASSWORD: ILoginState.CHANGE_PASSWORD,
    CHANGE_SEND_SMS: ILoginState.SEND_SMS,
    LOGIN: ILoginState.LOGIN,
    LOGIN_AFTER_RESET: ILoginState.LOGIN_AFTER_RESET,
    RESET: ILoginState.RESET,
};
