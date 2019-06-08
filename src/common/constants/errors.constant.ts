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
    },
    annualConsumptionNT: {
        required: 'Vyplňte roční spotřebu elektřiny v nízkém tarifu.',
    },
    annualConsumptionVT: {
        required: 'Vyplňte roční spotřebu elektřiny ve vysokém tarifu.',
    },
    bankAccountNumber: {
        required: 'povinne',
        invalidAccountNumber: 'invalidAcountNumber',
    },
    bankCode: {
        required: 'povinne',
        invalidAcountNumberPrefix: 'invalidAcountNumberPrefix',
    },
    circuitBreakerId: {
        required: 'Vyberte ze seznamu, jakou máte velikost jističe.',
    },
    commodityType: {
        required: 'Zvolte komoditu.',
    },
    confirmationCode: {
        required: 'Zadejte kód.',
        badCode: 'Zadali jste neplatný kód.',
    },
    consent: {
        signUp: {
            required: 'Nezapomeňte na souhlas se zpracováním osobních údajů.',
        },
        newsSubscription: {
            required: 'Nezapomeňte na souhlas se zásadami bezpečnosti.',
        },
    },
    date: {
        format: 'Vyplňte platný formát data.',
        expirationDateInPast: 'Doplnit můžete pouze budoucí datum.',
    },
    deposit: {
        required: 'Vyplňte adresu odběrného místa.',
    },
    depositPaymentType: {
        required: 'Vyberte ze seznamu jakého máte dodavatele.',
    },
    dic: {
        dicPrefix: 'dicPrefix',
        dicDecimal: 'dicDecimal',
        dicLength: 'dicLength',
        minLength: 'minLength',
        maxLength: 'maxLength',
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
    },
    fullName: {
        required: 'Vyplňte jméno.',
    },
    ico: {
        required: 'required',
        ico: 'ico',
        icoLength: 'icoLength',
        minLength: 'minLength',
        maxLength: 'maxLength',
    },
    name: {
        required: 'Vyplňte libovolný název odběrného místa (např. Byt dcera) v maximální délce 50 znaků.',
        maxlength: 'Maximální délka pro název odběrného místa je 50 znaků.',
    },
    number: {
        decimal: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        positive: 'Použít můžete pouze kladná čísla.',
        integer: 'Použít můžete pouze celá čísla.',
    },
    offerAnnualConsumptionId: {
        required: 'Vyberte ze seznamu spotřebu.',
    },
    offerCircuitBreakerId: {
        required: 'Vyberte ze seznamu velikost jističe.',
    },
    offerDistributionRateId: {
        required: 'Vyberte ze seznamu distribuční sazbu.',
    },
    offerDistributionLocation: {
        required: 'Vyberte ze seznamu distribuční umístění.',
    },
    offerDeliveryLength: {
        required: 'Vyberte ze seznamu délka dodávky.',
    },
    offerPriceGas: {
        required: 'Vyplňte cenu plynu.',
    },
    offerPriceNT: {
        required: 'Vyplňte cenu elektřiny v nízkém tarifu.',
    },
    offerPriceVT: {
        required: 'Vyplňte cenu elektřiny ve vysokém tarifu.',
    },
    offerPermanentPaymentPrice: {
        required: 'Vyplňte měsíční stálou platbu.',
    },
    offerValidFromTo: {
        required: 'Doplňte datum, dokdy je platná nabídka.',
    },
    offerDeliveryFromTo: {
        required: 'Doplňte datum dodávkového období.',
    },
    offerName: {
        required: 'Vyplňte libovolný název nabídky.',
    },
    phasesId: {
        required: 'Vyplňte typ fáze.',
    },
    password: {
        required: 'Zadejte heslo.',
    },
    subjectTypeId: {
        required: 'Zvolte odběratele.',
    },
    phone: {
        required: 'Vyberte ze seznamu jakého máte dodavatele.',
        invalidTelephone: 'Vyberte ze seznamu jakého máte dodavatele.',
    },
    phonePrefix: {
        required: 'Vyberte ze seznamu jakého máte dodavatele.',
        invalidTelephonePrefix: 'Vyberte ze seznamu jakého máte dodavatele.',
    },
    supplierId: {
        required: 'Vyberte ze seznamu jakého máte dodavatele.',
    },
    contractEndTypeId: {
        required: 'Zvolte typ ukončení platnosti aktuální smlouvy.',
    },
    timeToContractEnd: {
        required: 'Zadejte výpovědní lhůtu.',
        max: 'Zadejte maximálně 2 číslice do výpovědní lhůty.',
    },
    timeToContractEndPeriodId: {
        required: 'Zvolte typ výpovědní lhůty.',
    },
};
