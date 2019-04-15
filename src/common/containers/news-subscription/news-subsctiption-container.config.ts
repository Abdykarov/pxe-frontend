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
            email: 'Použijte pouze písmena bez diakritiky, číslice, tečku (.) a zavináč (@).',
            'already-registered-email': 'Tento e-mail již registrujeme.',
        },
        consent: {
            required: 'Nezapomeňte na souhlas se zásadami bezpečnosti.',
        },
    },
};
