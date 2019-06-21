import { changePasswordFields } from 'src/common/containers/form/forms/change-password/change-password-form.config';
import { emailFormFields } from 'src/common/containers/form/forms/reset-password/reset-password-form.config';
import {
    IFormFieldsLogin,
    ILoginState,
} from './login.model';
import {
    loginFormFields,
    loginSupplyAuthFormFields,
} from 'src/common/containers/form/forms/login/login-form.config';

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
