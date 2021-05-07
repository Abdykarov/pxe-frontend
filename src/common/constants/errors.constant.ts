import { CONSTS } from 'src/app/app.constants';
import { bytesToSize } from '../utils/bytes-to-size.fnc';

export const defaultErrorMessage = 'Došlo k chybě. Zkuste to později.';

export const importErrorCodes = {
    [CONSTS.IMPORT_ERROR_CODES.FILE_TYPE]: 'Vložit můžete pouze csv formát.',
    [CONSTS.IMPORT_ERROR_CODES.MAX_NUMBER_OF_FILES]: 'Vložit můžeze pouze jeden soubor.',
    [CONSTS.IMPORT_ERROR_CODES.NO_OFFERS_IN_IMPORT]: 'Pro zvolenou komoditu nebyl nalezen žádný záznam.',
};

export const askForOfferCodes = {
    [CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_TYPE]: 'Soubory s nepodporovanými formáty nebyly nahrány.',
    [CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_COUNT]: `Maximální počet souborů je ${CONSTS.ASK_FOR_OFFER.MAX_FILE_COUNT}.`,
    [CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_SIZE]: `Maximální velikost souboru je ${bytesToSize(CONSTS.ASK_FOR_OFFER.MAX_FILE_SIZE)}.`,
};

export const defaultErrorMessageViolation  = 'Neznáma chyba.';

export const importErrorViolations = {
    'must-not-be-blank': 'Nesmí být prázdný',
    'distribution-rate-is-required': 'Povinný atribut',
    'circuit-breaker-is-required': 'Povinný atribut',
    'phase-is-required': 'Jistič není validní',
    'annual-consumption-must-be-positive-number': 'Roční spotřeba není validní',
    'price-must-be-positive-number': 'Cena není validní',
    'priceNTMustBeNull': 'Nízký tarif nemá sazbu pro zvolenou distribuční sazbu',
    'price-vt-must-be-positive-number': 'Vysoký tarif není validní',
    'price-nt-must-be-positive-number': 'Vysoký tarif není validní',
    'permanent-price-must-be-positive-number': 'Cena není validní',
    'mustNotBeBlank': 'Nesmí být prázdný',
    'mustNotBeEmpty': 'Nesmí být prázdný',
    'mustNotBeNull': 'Nesmí být prázdný',
    'annual-consumption-is-required': 'Roční spotřeba nesmí být prázdná',
    'invalidOffer': 'Neplatný číselník',
    'circuitBreakerIdMustNotBeBlank': 'Jistič nesmí být prázdný',
    'distributionRateIdMustNotBeBlank': 'Distribuční území nesmí být prázdné',
    'priceVTMustNotBeNull': 'Vysoký tarif nesmí být prázdný',
    'priceNTMustBePositiveNumber': 'Nízký tarif není validní',
    'priceGasMustNotBeNull': 'Cena nesmí být prázdná',
    'annualConsumptionIdMustNotBeBlank': 'Spotřeba nesmí být prázdná',
    'greenEnergyMustNotBeNull': 'Zelená elektřina nesmí být prázdná',
    'subjectTypeIdMustNotBeBlank': 'Subjekt nesmí bý prázdný',
    'permanentPaymentPriceMustNotBeNull': 'Pernamentní cena nesmí být prázdná',
    'distributionLocationMustNotBeBlank': 'Distribuční území nesmí být prázdné',
    'deliveryLengthMustNotBeNull': 'Doba dodávky nesmí být prázdná',
    'deliveryToMustNotBeNull': 'Doba dodávky do data nesmí být prázdná',
    'deliveryFromMustNotBeNull': 'Doba dodávky od data nesmí být prázdná',
    'validToMustNotBeNull': 'Doba validity nabídky do data nesmí být prázdná',
    'validFromMustNotBeNull': 'Doba validity nabídky od data nesmí být prázdná',
    'supplierIdMustNotBeNull': 'ID dodavatele nesmí být prázdné',
    'priceNTMustNotBeNull': 'Nízký tarif nesmí být prázdný',
    'greenEnergyGasShouldBeFalse': 'Zelená energie není validní',
    'nameMustNotBeBlank': 'Název nesmí být prázdný',
    'invalidDistributionLocation': 'Zadané distribuční území je nevalidní',
    'invalidSubjectTypeId': 'Zadaný typ odběratele je nevalidní',
    'invalidDistributionRateId': 'Zadaný typ Distribučního území je nevalidní',
    'invalidCircuitBreakerId': 'Zadaný typ jističe je nevalidní',
    'invalidAnnualConsumptionId': 'Zadaný spotřeba je nevalidní',
    'greenEnergyWrongFormat': 'Zelená energie není validní',
    'priceNTWrongFormat': 'Nízká tarif není validní',
    'validFromWrongFormat': 'Platnost od není validní',
    'validToWrongFormat': 'Platnost do není validní',
    'deliveryFromWrongFormat': 'Dodávkové období od není validní',
    'deliveryToWrongFormat': 'Dodávkové období do není validní',
    'deliveryLengthWrongFormat': 'Dodávka není validní',
    'priceGasWrongFormat': 'Cena plynu není validní',
    'permanentPaymentPriceWrongFormat': 'Stála platba není validní',
    'benefit1InvalidSize': 'Benefit 1 - pro URL můžete použít maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_URL + ' znaků',
    'benefitUrl1InvalidSize': 'Benefit 1 - pro název můžete použít maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_NAME + ' znaků',
    'benefitUrl1InvalidFormat': 'Benefit 1 vyplňte validní URL adresu',
    'benefitWithUrl1Invalid': 'Benefit 1 není validní',
    'benefit2InvalidSize': 'Benefit 2 - pro URL můžete použít maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_URL + ' znaků',
    'benefitUrl2InvalidSize': 'Benefit 2 - pro název můžete použít maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_NAME + ' znaků',
    'benefitUrl2InvalidFormat': 'Benefit 2 vyplňte validní URL adresu',
    'benefitWithUrl2Invalid': 'Benefit 2 není validní',
    'benefit3InvalidSize': 'Benefit 3 - pro URL můžete použít maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_URL + ' znaků',
    'benefitUrl3InvalidSize': 'Benefit 3 - pro název můžete použít maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_NAME + ' znaků',
    'benefitUrl3InvalidFormat': 'Benefit 3 vyplňte validní URL adresu.',
    'benefitWithUrl3Invalid': 'Benefit 3 není validní',
    'benefit4InvalidSize': 'Benefit 4 - pro URL můžete použít maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_URL + ' znaků',
    'benefitUrl4InvalidSize': 'Benefit 4 - pro název můžete použít maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_NAME + ' znaků',
    'benefitUrl4InvalidFormat': 'Benefit 4 vyplňte validní URL adresu',
    'benefitWithUrl4Invalid': 'Benefit 4 není validní',
    'benefitsNotSetInOrder': 'Benefity nejsou ve správném pořadí',
    'nameInvalidSize' : 'Název nabídky -  použít můžete maximálně ' + CONSTS.VALIDATORS.MAX_LENGTH.OFFER_NAME + ' znaků.',
    'priceGasInvalidFormat' : 'Cena plyn - použít můžete maximálně ' + CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT
        + ' desetinná místa a ' + CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT + ' celých čísel.',
    'priceVTInvalidFormat': 'Cena za VT - použít můžete maximálně ' + CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT
        + ' desetinná místa a ' + CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT  + ' celých čísel.',
    'priceNTInvalidFormat': 'Cena za NT - použít můžete maximálně ' + CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT
        + ' desetinná místa a ' + CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT  + ' celých čísel.',
    'permanentPaymentPriceFormat': 'Stálá cena - použít můžete maximálně ' + CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT
        + ' desetinná místa a ' + CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT + ' celých čísel.',
    'validFromMustBeBeforeValidTo': 'Datum začátku platnosti nabídky musí být dřívější než její konec.',
    'deliveryFromMustBeBeforeDeliveryTo': 'Datum začátku dodávkového období musí být dřívější než jeho konec.',
};

export const oAuthApiError = {
    'SEC0007': 'Přihlášení se nezdařilo. Přihlašte se přes Bankovní identitu.',
    'SEC0006': 'Přihlášení se nezdařilo. Přihlašte se přes Google.',
    'SEC0005': 'Přihlášení se nezdařilo. Přihlašte se přes Facebook.',
    'SEC0005#_=_': 'Přihlášení se nezdařilo. Přihlašte se přes Facebook.',
    'SEC0004': 'Přihlášení se nezdařilo. Přihlašte se pomocí e-mailu (přihlašovacího jména) a hesla.',
    'SEC0003': 'Přihlášení se nezdařilo.',
    'SEC0003#_=_': 'Přihlášení se nezdařilo.',
};

export const restAPIErrorCodes = {
    'CLI0001': 'Špatné přihlašovací údaje.',
    'VAL00001': 'Vyplněný kód se neshoduje s kódem, který vám přišel v SMS.',
    'unknownDocument': 'Požadovaný dokument neexistuje.',
    'pdfNotAvailableTryLater': 'Vytvoření dokumentu je právě v procesu. Zkuste ho zobrazit později.',
    'accessDenied': 'K tomuto dokumentu nemáte oprávnění.',
};

export const graphQLMessages = {
    activeContractPresent: 'Účet nelze smazat, protože jsou aktivní smlouvy.',
    applicationError: 'Došlo k chybě. Zkuste to později.',
    cannotDeleteContract: 'Omlouváme se, ale z neočekávaného důvodu se odstoupení od smlouvy nepodařilo. Zkuste to prosím znovu později.',
    cannotSignContract: 'Omlouváme se, ale z neočekávaného důvodu se nepodařilo smlouvu podepsat. Zkuste to prosím znovu později.',
    forbiddenUpdateOfSupplyPoint: 'Omlouváme se, ale toto odběrné místo není možné nyní upravit. Zkuste to prosím znovu později.',
    invalidSupplyPointId: 'Hledané odběrné místo neexistuje nebo pro přístup k němu nemáte oprávnění.',
    noActiveAccountAvailable: 'Účet nelze smazat, protože neexistuje.',
    obsoleteSupplyPointVersion: 'Kontrakt lze uzavřít pouze na nejnovější verzi OM.',
    unknownSupplyPoint: 'Hledané odběrné místo neexistuje nebo pro přístup k němu nemáte oprávnění.',
    duplicateOffer: 'Nabídka nebyla založena, protože totožná nabídka již existuje.',
    mustBeValidPhoneNumber: 'Telefon musí obsahovat 9 číslic.',
    notValidOffer: 'Platnost nabídka vypršela.',
};

export const cantDeleteAllMarkedOffers = 'Nepodařilo se nám smazat veškeré označené nabídky, prosím zkuste to znovu.';

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
        maxKWh: `Nejvyšší možná spotřeba je ${CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH * 1000} KWh.`,
        maxMWh: `Nejvyšší možná spotřeba je ${CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH} MWh.`,
    },
    annualConsumptionNT: {
        required: 'Vyplňte roční spotřebu elektřiny v nízkém tarifu.',
        maxKWh: `Nejvyšší možná spotřeba je ${CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH * 1000} KWh.`,
        maxMWh: `Nejvyšší možná spotřeba je ${CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH} MWh.`,
    },
    annualConsumptionVT: {
        required: 'Vyplňte roční spotřebu elektřiny ve vysokém tarifu.',
        maxKWh: `Nejvyšší možná spotřeba je ${CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH * 1000} KWh.`,
        maxMWh: `Nejvyšší možná spotřeba je ${CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH} MWh.`,
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
    benefitName: {
        required: 'Vyplňte benefit.',
    },
    benefitUrl: {
        url: 'Vyplňte validní URL adresu.',
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
            required: 'Nezapomeňte na souhlas s Obchodními podmínkami parc4u a na vzetí na ' +
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
        alreadyRegisteredEmail: 'Tento e-mail je již v aplikaci zaregistrovaný.',
    },
    expirationDate: {
        requiredGas: 'Doplňte datum, dokdy je platná vaše aktuální smlouva na odběr plynu.',
        requiredPower: 'Doplňte datum, dokdy je platná vaše aktuální smlouva na odběr elektřiny.',
        isInTerminateInterval: 'Vaši aktuální smlouvu už máte automaticky prodlouženou. Vložte správné datum.',
        expirationAtLeast30DaysBeforeNewDelivery: 'Nejsme schopni v takto kratké době uzavřít navazující smlouvu.',
        notEnoughDaysToProcessContract: 'Smlouva nemůže být změněna, protože nezbývá dostatek času ke zpracování.',
    },
    fullName: {
        requiredPerson: 'Vyplňte své jméno a příjmení.',
        requiredPersonFirstName: 'Vyplňte své jméno.',
        requiredPersonLastName: 'Vyplňte své příjmení.',
        requiredSignatoryFirstName: 'Vyplňte jméno podepisující osoby.',
        requiredSignatoryLastName: 'Vyplňte příjmení podepisující osoby.',
        requiredCompany: 'Vyplňte název společnosti.',
        patternFirstName: 'Použít můžete pouze písmena, pomlčky a mezery.',
        patternLastName: 'Použít můžete pouze písmena, pomlčky a mezery.',
    },
    ico: {
        required: 'Vyplňte své IČO.',
        invalidIC: 'Vyplňte platné IČO, které obsahuje 8 číslic.',
    },
    name: {
        required: 'Vyplňte libovolný název odběrného místa (např. Byt dcera) v maximální délce 50 znaků.',
    },
    number: {
        decimal: 'Použít můžete pouze čísla a pro desetinné místo čárku nebo tečku.',
        decimalCount: 'Použít můžete maximálně {count} desetinná místa.',
        positive: 'Použít můžete pouze kladná čísla.',
        integer: 'Použít můžete pouze celá čísla.',
        positiveInteger: 'Použijte pouze celá a kladná čísla.',
        totalDigitLengthBeforeDecimalPoint: 'Použít můžete maximálně {maxLength} čísel před desetinnou čárkou.',
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
    orientationNumber: {},
    phasesId: {
        required: 'Vyberte ze seznamu, jakou máte fázi.',
    },
    password: {
        required: 'Vyplňte heslo.',
        currentRequired: 'Vyplňte své současné heslo.',
        pattern: '	Vaše heslo musí mít minimálně 10 znaků.',
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
        smsCodeAttemptsExceededLimit: 'Byl vyčerpán limit pro zadání kódu. Klikněte na "Poslat znovu" a vyplňte kód, který přijde v SMS.',
    },
    street: {
        required: 'Vyplňte ulici.',
    },
    string: {
        maxlength: 'Použít můžete maximálně {requiredLength|number:1.0-3} znaků.',
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
