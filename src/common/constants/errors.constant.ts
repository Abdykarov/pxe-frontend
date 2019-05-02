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
        signUp: {
            required: 'Nezapomeňte na souhlas se zpracovním osobních údajů.',
        },
        newsSubscription: {
            required: 'Nezapomeňte na souhlas se zásadami bezpečnosti.',
        },
    },
    password: {
        required: 'Zadejte heslo.',
    },
    code: {
        required: 'Zadejte kód.',
        badCode: 'Zadali jste neplatný kód.', // je treba syncs s grafkikou!!!
    },
};
