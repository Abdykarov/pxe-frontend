# parc4u

Aplikace slouží pro výběr nového dodavatele energií. "srovnávač"

## Základní odkazy
Wiki - https://wiki.lnd.bz/display/PXEPARC/PARC4Retail

Přístupy - https://wiki.lnd.bz/display/DLVR/PXE+P4R , https://wiki.lnd.bz/pages/viewpage.action?pageId=87753370

Bussiness logika - https://wiki.lnd.bz/pages/viewpage.action?pageId=181964207

Zastaralá dokumentace - https://wiki.lnd.bz/display/PXEPARC/Dokumentace -

Doporučená sekce: https://wiki.lnd.bz/pages/viewpage.action?pageId=98765235

Výpočet cen pro parametry: https://wiki.lnd.bz/pages/viewpage.action?pageId=181968101

Mapování cen do FE: https://wiki.lnd.bz/pages/viewpage.action?pageId=71241134

Ostatní věci ohledně devstacku popsáno: https://wiki.lnd.bz/display/DS/Angular+DevStack

## Struktura projektu

- <b>pdf-export</b> Složka pro, kde se obsahují vzorové smlouvy. Po každé změně ve smlouvách na BE je nutné tyto HTML aktualizovat a vygenerované .PDF přidat do vzorových smluv a staré do archivu.
- <b>src</b> Zdrojové soubory
    - <b>500</b> - Aplikace, v případě nedostuptnosti hlavní aplikace
    - <b>app</b> - Hlavní aplikace
      - <b>layout</b> - Laouty dle typu a účelu stránek
        - <b>generate-data</b> Slouží pro prerender, když jsou pro stránku potřeba dogenerovat náký data.
        - <b>o-auth</b> Slouží pro BE, když se uživatel přihláší přes google, tak BE redirectne v poslendím kroku na tenhle endpoint a nasimuluje přihlášení a redirect na sekci pro odběratele.
        - <b>public</b> Layout pro nepřihlášené uživatele.
        - <b>secured</b> Layout pro přihlášené uživatele.
      - <b>resolver</b> Jelikož je aplikace napojena na Squidex, tak pro fetchnutí dat se použvají resolvery
      - <b>services</b>
        - <b>apollo-cms.service.ts</b> Wrapper nad klasickým apollem, rozšířen o normalizaci dat z CMS. 
        - <b>crypto.service.ts</b> Některá citlivá data se ukládají do localstorege, tato služba je umožnuje zahashovat.
        - <b>s-analytics.service.ts</b> Implementuje zoe.io.
        - <b>ga|gtm.service.ts</b> V systému je nasazen GA přes GTM, přes tento nástroj je dále nasazen Hotjar.
        - <b>...</b>
      - <b>pages</b> Aplikace má 4ři rozhraní
        - <b>admins</b> - Pro adminy. Správa faktur a uživatelů, kteří chtějí vyplnit jejich údaje a samotným se nechce.  
        - <b>consumers</b> - Po importu nebo registraci se stávají uživatele odběratelem, v těchto stránkách si vybírají pro svoje OM nabídku od dodavatele. 
        - <b>not-found</b> 
        - <b>public</b> - Public page (LP, přihlášení... )
        - <b>suppliers</b> - Správa nabídek, import, stažení uzavřených smluv - pro dodavatele
    - <b>assets</b> - Public složka (csska, configurace, fonty, obrázky), o správné kopírování configurací dle prostředí se stará Jenkins
    - <b>common</b> - Znovupoužitelné pipy, služby atd
        - <b>cms</b> - Napojení na CMS
        - <b>constants</b> - Konastanty převážně errors
        - <b>containers</b> - Smart componenty obsahující logiku
        - <b>decorators</b> - Dekorátory
        - <b>directives</b> -  Direktivy
        - <b>graphql</b> - Systém konsumuje API přes Graphql, CMS a Graphql mají vlastní pojmenování Apollo clienta, kdy API client je defaultní
        - <b>pipes</b> - Zde je složka common a secured. Implementace je takováhle, jinak webpack zařadí všecky moduly do main.js a nefunguej condesplitting.
        - <b>ui</b> - Dump UI komponnty
        - <b>utils</b> 
        - <b>abstract.component.ts</b> - Převážně unsubcribe pro obserables
        - <b>abstract.facade.ts </b> - Znovupoužitelná CRUD logika pro facady
    - <b>server</b> - Prerender a SSR
    - <b>static</b> - Statická aplikace podpora atomického designu
    - <b>third-sides</b> - Knihovny třetích stran, které byly potřeba lehce "ohnout"
- <b>.eslintrc.json</b> - nastavení eslintu + prettier
- <b>.huskyrc</b> - husky pouští yarn lint
- <b>.prettierignore</b>
- <b>Dockerfile.deploy.app</b>
- <b>.huskyrc</b>
- <b>run-test.sh</b>

## Stack
- <b>FE</b> - Angular
- <b>BE</b> - Kotlin, Spring, Hibernate a postgresql
- <b>API</b> - Graphql, Rest (Převážně soubory)

### Hlavní knihovny
- <b>@angular</b>
- <b>@apollo/client & apollo-angular</b> - Fetchování dat, state managment
- <b>moment</b> - Nepoužívat v public layoutu, jinak se zvedne budle size
- <b>ng-recaptcha</b> - Formuláře v public sekci jsou chráněny přes recaptcha v2 invisible  
- <b>ramda</b> - Funkcionální programování
- <b>RxJS</b> - Reaktivní programování
- <b>UI komponenty</b> - Vlastní z Lundegaard Angular devstacku

## Package.json - Scripty
### Puštění aplikace

    "start:app": "yarn start --proxy-config proxy-dev.conf.json", // Puštění aplikace oproti lokálnímu BE
    "start:preview": "yarn start --proxy-config proxy-prev.conf.json", // Puštění aplikace oproti preview
    "start:test": "yarn start --proxy-config proxy-test.conf.json", // Puštění aplikace oproti testu
    "start:static": "yarn start static", // Puštění aplikace statiku

### Puštění lokálního BE

https://bitbucket.org/lundegaard/pxe-parc4retail-backend/src/develop/README.md


### Produkční build - SSR

    "build:ssr": "yarn build:client-and-server-bundles", 
    "start:ssr": "node dist/server/main.js",

### Produkční build - Prender

    "build:generate-data": "ng run app:generate-data-for-prerender",
    "prerender": "ng run app:prerender",

### Anylýza budle size

    "bundle-report-create": "yarn build:app --stats-json",
    "bundle-report": "webpack-bundle-analyzer dist/app/stats.json",


## Jenkins build
Popsáno zde

https://jira.lnd.bz/browse/ICTOHELP-2299

## Squidex

### Prostředí
Preview - https://squidex.lnd.bz

Test - https://squidex-preview.lnd.bz

Prod - https://squidex-prod.lnd.bz

### Job

#### Preview
Job na pusteni squidexu na preview nedělá nic.

#### Test 
Při puštění jobu se se Squidexem nic neděje.

<i><u><b> Test squidex musí být vždy 1:1 s produkcí !!! </b></i></u>

#### Production
Při puštění jobnu na produkci se kopíruje test squidex na prod squidex.

Zde bylo třeba pokaždý změnit rules a upravit url adresu z test.parc4u.cz na parc4u.cz.

Jelikož je nově implementován prerender a web je statický, tak toto není třeba dělat.
