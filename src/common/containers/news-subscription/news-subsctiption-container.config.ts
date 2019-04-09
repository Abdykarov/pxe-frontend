import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { IForm } from 'src/common/ui/news-subscription/models/form-definition.model';

export const subscriptionFormFields: IForm = {
    controls: {
        email: [
            '',
            [
                Validators.required,
                Validators.min(1),
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
        },
        consent: {
            required: 'Musíte souhlasit se zásadami bezpečnosti.',
        },
    },
};
