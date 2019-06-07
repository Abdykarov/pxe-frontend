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
        badCode: 'Zadali jste neplatný kód.', // je treba syncs s grafikou!!!
    },
    consent: {
        signUp: {
            required: 'Nezapomeňte na souhlas se zpracováním osobních údajů.',
        },
        newsSubscription: {
            required: 'Nezapomeňte na souhlas se zásadami bezpečnosti.',
        },
    },
    deposit: {
        required: 'Vyplňte adresu odběrného místa.',
    },
    depositPaymentType: {
        required: 'Vyberte ze seznamu jakého máte dodavatele.',
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
        format: 'Vyplňte platný formát data.',
        expirationDateInPast: 'Doplnit můžete pouze budoucí datum.',
    },
    fullName: {
        required: 'Vyplňte jméno.',
    },
    name: {
        required: 'Vyplňte libovolný název odběrného místa (např. Byt dcera) v maximální délce 50 znaků.',
        maxlength: 'Maximální délka pro název odběrného místa je 50 znaků.',
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
        annualConsumptionVT: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        negativeAnnualConsumption: 'Použít můžete pouze kladná čísla.',
    },
    offerPriceNT: {
        required: 'Vyplňte cenu elektřiny v nízkém tarifu.',
        annualConsumptionVT: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        negativeAnnualConsumption: 'Použít můžete pouze kladná čísla.',
    },
    offerPriceVT: {
        required: 'Vyplňte cenu elektřiny ve vysokém tarifu.',
        annualConsumptionVT: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        negativeAnnualConsumption: 'Použít můžete pouze kladná čísla.',
    },
    offerPermanentPaymentPrice: {
        required: 'Vyplňte měsíční stálou platbu.',
        annualConsumptionVT: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        negativeAnnualConsumption: 'Použít můžete pouze kladná čísla.',
    },
    offerValidFromTo: {
        required: 'Doplňte datum, dokdy je platná nabídka.',
        format: 'Vyplňte platný formát data.',
        expirationDateInPast: 'Doplnit můžete pouze budoucí datum.',
    },
    offerDeliveryFromTo: {
        required: 'Doplňte datum dodávkového období.',
        format: 'Vyplňte platný formát data.',
        expirationDateInPast: 'Doplnit můžete pouze budoucí datum.',
    },
    offerName: {
        required: 'Vyplňte libovolný název nabídky.',
    },
    phasesId: {
        required: 'Vyplňte fázy.',
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
        required: 'contractEndTypeId',
    },
    timeToContractEnd: {
        required: 'timeToContractEnd1',
        max: 'max2',
        isPossibleInteger: 'isPossibleInteger3',
    },
    timeToContractEndPeriodId: {
        required: 'timeToContractEndPeriodId',
    },
};
