export const defaultRestAPIErrorMessage = 'Došlo k chybě. Zkuste to později.';

export const restAPIErrorCodes = {
    'CLI0001' : 'Špatné přihlašovací údaje.',
};

export const errorFieldMessages =  {
    address: {
        required: 'Vyplňte adresu odběrného místa.',
        invalidAddress: 'Zvolená adresa není platná.',
        requiredPermanentAddressPerson: 'Vyplňte trvalou adresu.',
        invalidPermanentAddressPerson: 'Zvolená trvalá adresa není platná.',
        requiredCurrentAddressPerson: 'Vyplňte korespondenční adresu.',
        invalidCurrentAddressPerson: 'Zvolená korespondenční adresa není platná.',
        requiredPermanentAddressCompany: 'Vyplňte trvalou adresu sídla společnosti.',
        invalidPermanentAddressCompany: 'Zvolená trvalá adresa sídla společnosti není platná.',
        requiredCurrentAddressCompany: 'Vyplňte korespondenční adresu sídla společnosti.',
        invalidCurrentAddressCompany: 'Zvolená korespondenční adresa sídla společnosti není platná.',
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
        required: 'Číslo účtu je povinné.',
        accountNumber: 'Zadejte číslo účtu ve správném formátu.',
        accountNumberBoth: 'Zadejte předčíslí a číslo účtu ve správném formátu.',
        accountNumberPrefix: 'Zadejte předčíslí účtu ve správném formátu.',
    },
    bankCode: {
        required: 'Zadejte kód banky.',
        bankCode: 'Zadejte správný kód banky.',
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
        formatInterval: 'Datum zadejte jako interval ve formátu dd.mm.rrrr - dd.mm.rrrr.',
        expirationDateInPast: 'Doplnit můžete pouze budoucí datum.',
    },
    deposit: {
        required: 'Vyplňte výši záloh.',
    },
    depositPaymentType: {
        required: 'Vyberte ze seznamu způsob placení záloh.',
    },
    dic: {
        invalidDIC: 'Zadejte své DIČ ve správném formátu.',
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
        alreadyRegisteredEmail: 'Tento e-mail již registrujeme.',
    },
    expirationDate: {
        requiredGas: 'Doplňte datum, dokdy je platná vaše aktuální smlouva na odběr plynu.',
        requiredPower: 'Doplňte datum, dokdy je platná vaše aktuální smlouva na odběr elektřiny.',
    },
    fullName: {
        requiredPerson: 'Vyplňte jméno a příjmení.',
        requiredCompany: 'Vyplňte název společnosti.',
    },
    ico: {
        required: 'Zadejte své IČ.',
        invalidIC: 'Zadejte své IČ ve správném formátu.',
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
    offerDeliveryFromTo: {
        required: 'Doplňte datum dodávkového období.',
    },
    offerDeliveryLength: {
        required: 'Vyberte ze seznamu délku dodávky.',
    },
    offerDistributionRateId: {
        required: 'Vyberte ze seznamu distribuční sazbu.',
    },
    offerDistributionLocation: {
        required: 'Vyberte ze seznamu distribuční umístění.',
    },
    offerName: {
        required: 'Vyplňte libovolný název pro označení nabídky.',
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
        required: 'Vyplňte (stálou) měsíční platbu.',
    },
    offerSubjectTypeId: {
        required: 'Vyberte ze seznamu typ odběratele.',
    },
    offerValidFromTo: {
        required: 'Doplňte odkdy dokdy je nabídka platná.',
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
        required: 'Zadejte svůj telefon.',
        invalidPhoneNumber: 'Zadaný telefon není ve správném formátu.',
    },
    phonePrefix: {
        required: 'Zadejte předvolbu země. +420 pro ČR nebo +421 pro SR.',
        invalidPhoneNumberPrefix: 'Zadejte správnou předvolbu země. +420 pro ČR nebo +421 pro SR.',
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
