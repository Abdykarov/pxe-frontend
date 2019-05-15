export const defaultRestAPIErrorMessage = 'Došlo k chybě. Zkuste to později.';

export const restAPIErrorCodes = {
    'CLI0001' : 'Špatné přihlašovací údaje.',
};

export const errorFieldMessages =  {
    address: {
        required: 'Vyplňte adresu odběrného místa.',
        invalidAddress: 'Zvolená adresa není platná.',
    },
    annualConsumption: {
        required: 'Vyplňte roční spotřebu plynu.',
        annualConsumption: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        negativeAnnualConsumption: 'Použít můžete pouze kladná čísla.',
    },
    annualConsumptionNT: {
        required: 'Vyplňte roční spotřebu elektřiny v nízkém tarifu.',
        annualConsumptionNT: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        negativeAnnualConsumption: 'Použít můžete pouze kladná čísla.',
    },
    annualConsumptionVT: {
        required: 'Vyplňte roční spotřebu elektřiny ve vysokém tarifu.',
        annualConsumptionVT: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        negativeAnnualConsumption: 'Použít můžete pouze kladná čísla.',
    },
    circuitBreakerId: {
        required: 'Vyberte ze seznamu, jakou máte velikost jističe.',
    },
    commodityType: {
        required: 'Zvolte komoditu.',
    },
    consent: {
        signUp: {
            required: 'Nezapomeňte na souhlas se zpracováním osobních údajů.',
        },
        newsSubscription: {
            required: 'Nezapomeňte na souhlas se zásadami bezpečnosti.',
        },
    },
    distributionRateId: {
        required: 'Vyberte ze seznamu, jakou máte distribuční sazbu.',
    },
    ean: {
        required: 'Vyplňte unikátní 18místné identifikační číslo odběrného místa.',
        ean: 'Správné identifikační číslo odběrného místa má 18 znaků, obsahuje pouze čísla a vždy začíná 8591824.',
        invalidEan: 'Správné identifikační číslo odběrného místa má 18 znaků, obsahuje pouze čísla a vždy začíná 8591824.',
    },
    eic: {
        required:  'Vyplňte unikátní 16místný identifikační kód odběrného místa.',
        eic: 'Správný identifikační kód odběrného místa má 16 znaků, obsahuje pouze čísla a písmena a vždy začíná 27ZG.',
    },
    email: {
        required: 'Zadejte svůj e-mail.',
        email: 'Použijte pouze písmena bez diakritiky, číslice, tečku (.) a zavináč (@).',
        invalidEmail: 'Použijte pouze písmena bez diakritiky, číslice, tečku (.) a zavináč (@).',
        alreadyRegisteredEmail: 'Tento e-mail již registrujeme.',
    },
    expirationDate: {
        requiredGas: 'Doplňte datum, dokdy je platná vaše aktuální smlouva na odběr plynu.',
        requiredPower: 'Doplňte datum, dokdy je platná vaše aktuální smlouva na odběr elektřiny.',
        format: 'Vyplňte platný formát data v budoucnosti.',
        expirationDateInPast: 'Doplnit můžete pouze budoucí datum.',
    },
    name: {
        required: 'Vyplňte libovolný název odběrného místa (např. Byt dcera) v maximální délce 50 znaků.',
        maxlength: 'Maximální délka pro název odběrného místa je 50 znaků.',
    },
    password: {
        required: 'Zadejte heslo.',
    },
    supplierId: {
        required: 'Vyberte ze seznamu jakého máte dodavatele.',
    },
    code: {
        required: 'Zadejte kód.',
        badCode: 'Zadali jste neplatný kód.', // je treba syncs s grafikou!!!
    },
};
