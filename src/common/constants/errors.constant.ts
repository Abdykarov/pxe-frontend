import { CONSTS } from 'src/app/app.constants';

export const defaultErrorMessage = 'Došlo k chybě. Zkuste to později.';

export const restAPIErrorCodes = {
    'CLI0001' : 'Špatné přihlašovací údaje.',
};

export const graphQLMessages = {
    cannotDeleteContract: 'Omlouváme se, ale z neočekávaného důvodu se odstoupení od smlouvy nepodařilo. Zkuste to prosím znovu později.',
    cannotSignContract: 'Omlouváme se, ale z neočekávaného důvodu se nepodařilo smlouvu podepsat. Zkuste to prosím znovu později.',
    invalidSupplyPointId: 'Hledané odběrné místo neexistuje nebo pro přístup k němu nemáte oprávnění.',
    forbiddenUpdateOfSupplyPoint: 'Omlouváme se, ale toto odběrné místo není možné nyní upravit. Zkuste to prosím znovu později.',
};

export const offerValidityMessages = {
    contractEndWithTerminate: 'Na základě uvedeného data platnosti aktuální smlouvy můžete ' +
        'vybírat pouze z nabídek od svého aktuálního dodavatele.',
    contractEndWithoutTerminate: 'Na základě uvedeného data platnosti aktuální smlouvy můžete ' +
        'vybírat pouze z nabídek od svého aktuálního dodavatele.',
};

export const errorFieldMessages =  {
    address: {
        required: 'Vyplňte adresu odběrného místa.',
        invalidAddress: 'Zvolená adresa není platná.',
        requiredPermanentAddressPerson: 'Vyplňte svou trvalou adresu.',
        invalidPermanentAddressPerson: 'Zvolená trvalá adresa není platná.',
        requiredCurrentAddressPerson: 'Vyplňte svou korespondenční adresu.',
        invalidCurrentAddressPerson: 'Zvolená korespondenční adresa není platná.',
        requiredPermanentAddressCompany: 'Vyplňte sídlo společnosti.',
        invalidPermanentAddressCompany: 'Zvolená adresa sídla společnosti není platná.',
        requiredCurrentAddressCompany: 'Vyplňte fakturační adresu společnosti.',
        invalidCurrentAddressCompany: 'Zvolená fakturační adresa společnosti není platná.',
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
        required: 'Vyplňte číslo účtu.',
        accountNumber: 'Vyplňte správné číslo účtu včetně případného předčíslí s pomlčkou.',
        accountNumberBoth: 'Vyplňte správné předčíslí (včetně pomlčky) a číslo účtu.',
        accountNumberPrefix: 'Vyplňte správné předčíslí účtu i s pomlčkou.',
    },
    bankCode: {
        required: 'Vyplňte kód banky.',
        bankCode: 'Kód banky musí obsahovat 4 číslice.',
    },
    birthDate: {
        required: 'Vyplňte datum narození.',
        bsDateMaxDate: 'Nesmíte být mladší 18 let.',
        bsDateMinDate: 'Rok narození musí být minimálně 1900.',
    },
    circuitBreakerId: {
        required: 'Vyberte ze seznamu, jakou máte velikost jističe.',
    },
    city: {
        required: 'Vyplňte město nebo obec.',
        maxlengthCity: 'Použít můžete maximálně {requiredLength} znaků.',
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
            required: 'Nezapomeňte na souhlas s Všeobecnými obchodními podmínkami PARC4U a na vzetí na ' +
                'vědomí informací o Ochraně osobních údajů.',
        },
        newsSubscription: {
            required: 'Nezapomeňte na souhlas se zásadami bezpečnosti.',
        },
    },
    date: {
        format: 'Vyplňte platný formát data.',
        formatInterval: 'Datum vyplňte jako interval ve formátu dd.mm.rrrr - dd.mm.rrrr.',
        expirationDateInPast: 'Zadat můžete pouze budoucí datum.',
    },
    deposit: {
        required: 'Vyplňte, jakou chcete mít výši záloh.',
        requiredMinValue: 'Minimální výše záloh je {min|ceil:2:1.0-2} Kč.',
    },
    depositPaymentType: {
        required: 'Vyberte ze seznamu, jak chcete platit zálohy.',
    },
    descriptiveNumber: {
        required: 'Vyplňte číslo popisné.',
        maxlengthDescriptiveNumber: 'Použít můžete maximálně {requiredLength} znaků.',
    },
    dic: {
        dicPrefix: 'Vyplňte své DIČ.',
        dicDecimal: 'Správné DIČ pro ČR obsahuje CZ a 8-10 číslic.',
    },
    distributionRateId: {
        required: 'Vyberte ze seznamu, jakou máte distribuční sazbu.',
    },
    ean: {
        required: 'Vyplňte unikátní 18místné identifikační číslo odběrného místa.',
        ean: 'Správné identifikační číslo odběrného místa má 18 znaků, obsahuje pouze čísla,' +
            ' vždy začíná 8591824 a na 10. pozici nesmí mít číslici 0 ani 9.',
        nonUniqueEan: 'Vyplněné identifikační číslo odběrného místa již registrujeme.',
    },
    eic: {
        required:  'Vyplňte unikátní 16místný identifikační kód odběrného místa.',
        eic: 'Správný identifikační kód odběrného místa má 16 znaků, obsahuje pouze čísla a písmena, ' +
            'vždy začíná 27ZG a na 5.-7. pozici nesmí mít číslo 800.',
        nonUniqueEic: 'Vyplněný identifikační kód odběrného místa již registrujeme.',
    },
    email: {
        required: 'Vyplňte svůj e-mail.',
        email: 'Použijte pouze písmena bez diakritiky, číslice, tečku (.) a zavináč (@).',
        emailNotRegistered: 'Tento e-mail v aplikaci neexistuje.',
        alreadyRegisteredEmail: 'Tento e-mail je již v aplikaci zaregistrovaný.',
    },
    expirationDate: {
        requiredGas: 'Doplňte datum, dokdy je platná vaše aktuální smlouva na odběr plynu.',
        requiredPower: 'Doplňte datum, dokdy je platná vaše aktuální smlouva na odběr elektřiny.',
        isInTerminateInterval: 'Vaši aktuální smlouvu už máte automaticky prodlouženou. Vložte správné datum.',
    },
    fullName: {
        requiredPerson: 'Vyplňte své jméno a příjmení.',
        requiredPersonFirstName: 'Vyplňte své jméno.',
        requiredPersonLastName: 'Vyplňte své příjmení.',
        requiredSignatoryFirstName: 'Vyplňte jméno podepisující osoby.',
        requiredSignatoryLastName: 'Vyplňte příjmení podepisující osoby.',
        requiredCompany: 'Vyplňte název společnosti.',
        maxlengthFirstName: 'Použít můžete maximálně {requiredLength} znaků.',
        maxlengthLastName: 'Použít můžete maximálně {requiredLength} znaků.',
        maxlengthFullName: 'Použít můžete maximálně {requiredLength} znaků.',
        patternFirstName: 'Použít můžete pouze písmena, pomlčky a mezery.',
        patternLastName: 'Použít můžete pouze písmena, pomlčky a mezery.',
    },
    ico: {
        required: 'Vyplňte své IČO.',
        invalidIC: 'Vyplňte platné IČO, které obsahuje 8 číslic.',
    },
    name: {
        required: 'Vyplňte libovolný název odběrného místa (např. Byt dcera) v maximální délce 50 znaků.',
        maxlength: 'Maximální délka pro název odběrného místa je 50 znaků.',
    },
    number: {
        decimal: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        decimalCount: 'Použít můžete maximálně {count} desetinná místa.',
        positive: 'Použít můžete pouze kladná čísla.',
        integer: 'Použít můžete pouze celá čísla.',
        positiveInteger: 'Použijte pouze celá a kladná čísla.',
    },
    offerAnnualConsumptionId: {
        required: 'Vyberte ze seznamu spotřebu.',
    },
    offerCircuitBreakerId: {
        required: 'Vyberte ze seznamu velikost jističe.',
    },
    offerDeliveryFromTo: {
        required: 'Vyplňte datum dodávkového období.',
        formatIntervalDiff: 'Datum začátku dodávkového období musí být dřívější než jeho konec.',
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
        required: 'Vyplňte stálou platbu.',
    },
    offerSubjectTypeId: {
        required: 'Vyberte ze seznamu typ odběratele.',
    },
    offerValidFromTo: {
        required: 'Vyplňte odkdy dokdy je nabídka platná.',
        formatIntervalDiff: 'Datum začátku platnosti nabídky musí být dřívější než její konec.',
    },
    orientationNumber: {
        maxlengthOrientationNumber: 'Použít můžete maximálně {requiredLength} znaků.',
    },
    phasesId: {
        required: 'Vyberte ze seznamu, jakou máte fázi.',
    },
    password: {
        required: 'Vyplňte heslo.',
        currentRequired: 'Vyplňte své současné heslo.',
        pattern: '	Vaše heslo musí mít minimálně 8 písmen, musí obsahovat malá a velká ' +
            'písmena, aspoň jednu číslici a aspoň jeden speciální znak jako &_*+/#\ apod.',
        fieldsMustMatch: 'Musíte vyplnit stejná hesla.',
        invalidCurrentPassword: 'Vyplněné heslo se s vaším současným heslem neshoduje.',
    },
    phone: {
        required: 'Vyplňte svůj telefon.',
        requiredMobile: 'Vyplňte svůj mobilní telefon.',
        requiredLandLine: 'Vyplňte svoji pevnou linku.',
        phoneNumber: 'Telefon musí obsahovat 9 číslic.',
        mobilePhoneNumber: 'Mobilní telefon musí obsahovat 9 číslic.',
        landLineNumber: 'Pevná linka musí obsahovat 9 číslic.',
    },
    phonePrefix: {
        required: `Vyplňte předvolbu pro ČR ${CONSTS.TELEPHONE_PREFIX_CZ}.`,
        invalidPhoneNumberPrefix: `Vyplňte správnou předvolbu pro ČR ${CONSTS.TELEPHONE_PREFIX_CZ}.`,
    },
    region: {
        required: 'Vyberte ze seznamu kraj.',
    },
    signatoryPosition: {
        required: 'Vyplňte funkci, kterou má ve společnosti podepisující osoba.',
        maxlengthSignatoryPosition: 'Použít můžete maximálně 80 znaků.',
    },
    smsCode: {
        required: 'Vyplňte kód, který vám přišel v SMS.',
        invalidSmsCode: 'Vyplněný kód se neshoduje s kódem, který vám přišel v SMS.',
    },
    street: {
        required: 'Vyplňte ulici.',
        maxlengthStreet: 'Použít můžete maximálně {requiredLength} znaků.',
    },
    supplierId: {
        required: 'Vyberte ze seznamu jakého máte dodavatele.',
    },
    subjectTypeId: {
        required: 'Zvolte odběratele.',
    },
    contractEndTypeId: {
        required: 'Zvolte typ ukončení platnosti aktuální smlouvy.',
    },
    timeToContractEnd: {
        required: 'Vyplňte délku výpovědní lhůty.',
        max: 'Doplňte maximálně 2 číslice.',
    },
    timeToContractEndPeriodId: {
        required: 'Vyberte ze seznamu odpovídající časový údaj.',
    },
    postCode: {
        required: 'Vyplňte PSČ.',
        pattern: 'Použít můžete pouze 5 číslic.',
    },
};
