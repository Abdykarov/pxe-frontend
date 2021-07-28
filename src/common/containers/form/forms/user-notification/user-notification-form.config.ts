import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const userNotificationFormFields: IForm = {
    controls: {
        systemNotification: [
            true,
        ],
        watchDogNotification: [
            true,
        ],
    },
    validationMessages: {
        firstName: {},
    },
};
