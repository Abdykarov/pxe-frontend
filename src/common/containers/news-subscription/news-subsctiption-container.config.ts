import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { IForm } from 'src/common/ui/news-subscription/models/form-definition.model';

export const subscriptionFormFields: IForm = {
    controls: {
        email: [
            '',
            [
                Validators.required,
                CustomValidators.email,
            ],
        ],
        consent: [
            false,
            [
                Validators.requiredTrue,
            ],
        ],
    },
    validationMessages: {
        email: {
            required: 'Zadejte svůj e-mail.',
            email: 'E-mail není ve správném formátu.',
            'already-registered-email': 'Tento email je již registrován.',
        },
        consent: {
            required: 'Musíte souhlasit se zásadami bezpečnosti.',
        },
    },
};
