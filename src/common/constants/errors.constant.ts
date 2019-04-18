export const defaultRestAPIErrorMessage = 'Došlo k chybě. Zkuste to později.';

export const restAPIErrorCodes = {
    'CLI0001' : 'Špatné přihlašovací údaje.',
};

export const errorFieldMessages =  {
    email: {
        required: 'Zadejte svůj e-mail.',
        email: 'Použijte pouze písmena bez diakritiky, číslice, tečku (.) a zavináč (@).',
        alreadyRegisteredEmail: 'Tento e-mail již registrujeme.',
    },
    consent: {
        required: 'Nezapomeňte na souhlas se zásadami bezpečnosti.',
    },
    password: {
        required: 'Zadejte heslo.',
    },
};
