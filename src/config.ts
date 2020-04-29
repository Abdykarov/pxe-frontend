/* tslint:disable max-line-length*/

export interface IQuestion {
    id: number;
    tag: Tag;
    url: string;
    header: string;
    shortContent: string;
    fullContent?: string;
    oneOfMostVisited?: boolean;
}

export enum Tag {
    GENERAL = 'general',
    SUPPLIER = 'supplier',
}

export interface ITagConfigItem {
    type: Tag;
    url: string;
    label: string;
}

export const tagConfig: ITagConfigItem[] = [
    {
        type: Tag.GENERAL,
        url: 'general',
        label: 'Obecné',
    },
    {
        type: Tag.SUPPLIER,
        url: 'supplier',
        label: 'Dodavatelé',
    },
];

export const questions: IQuestion[] = [
    {
        id: 1,
        tag: Tag.GENERAL,
        url: 'price-length',
        header: 'Opravdu budu mít vybranou cenu po celou dobu zvoleného období?',
        shortContent: 'Ano, dodavatel vám cenu za silovou elektřinu nebo za odebraný zemní plyn nemůže změnit. To však neplatí pro regulované ceny, které jsou stanoveny Cenovým rozhodnutím Energetického regulačního úřadu.',
        oneOfMostVisited: true,
    },
    {
        id: 2,
        tag: Tag.GENERAL,
        url: 'better-price',
        header: 'Mohu někde dostat lepší cenu?',
        shortContent: 'Nedá se vyloučit, že někteří dodavatelé, mimo PARC4U, mohou z nějakého důvodu poskytnout lepší cenové podmínky. Ty ale budou, s největší pravděpodobností, vykoupeny nějakými „kličkami a háčky“ v podmínkách dodávky, které v PARC4U nechceme.',
        oneOfMostVisited: true,
    },
    {
        id: 3,
        tag: Tag.GENERAL,
        url: 'change-supplier',
        header: 'Jak se dozvím, že změna dodavatele proběhla úspěšně?',
        shortContent: 'O úspěšné změně vás bude informovat nový dodavatel. Současně vám, před zahájením odběru, zašle zálohový kalendář.',
    },
    {
        id: 4,
        tag: Tag.GENERAL,
        url: 'automatic-prolongation',
        header: 'Proč je v mé smlouvě uvedena automatická prolongace?',
        shortContent: 'Automatická prolongace je ve smlouvách přes PARC4U z důvodu vaší ochrany. Nechceme, aby se vám stalo, že nebudete mít řádně uzavřenu smlouvu o dodávce v případě, že si včas nestihnete zvolit nového dodavatele či prodloužit smlouvu s tím stávajícím.  Nemusíte se ale ničeho obávat, protože vás budeme předem informovat o tom, že je čas zajistit si dodávku na další období. Případné automatické prodloužení nastane pouze v případě, že na naše výzvy nebudete reagovat.',
    },
    {
        id: 5,
        tag: Tag.GENERAL,
        url: 'reason-for-payment',
        header: 'Proč musím platit požadovanou 1 Kč?',
        shortContent: 'Je to ochrana jak vás, tak nás, ale také stávajícího i nového dodavatele. Nechceme, aby v aplikaci vznikala falešná odběrná místa nebo např.  změny dodavatele pro souseda, který o to vůbec nestojí. Posláním 1 Kč dochází k ověření relevantního zájmu o naši službu. Naopak, pokud 1 Kč nepošlete, je smlouva neplatná.',
    },
    {
        id: 6,
        tag: Tag.GENERAL,
        url: 'reason-for-payment',
        header: 'Jak se počítá celková cena za elektřinu?',
        shortContent: 'Je složená z těchto 3 částí:' +
            '1.     Distribuční cena – tvoří až 60 % z celkové ceny, je pevně daná, dodavatel ji nemůže ovlivnit\n' +
            '2.     Silová elektřina – pravidelná záloha za odběrné místo + cena elektřiny ve vysokém (VT) a nízkém (NT) tarifu\n' +
            '3.     Daň z elektřiny.',
    },
    {
        id: 7,
        tag: Tag.GENERAL,
        url: 'about-pxe',
        header: 'Kdo je PXE?',
        shortContent: 'POWER EXCHANGE CENTRAL EUROPE, a.s. („PXE“) je ze 2/3 dceřinou společností European Energy Exchange AG, celosvětově největší burzou obchodující s elektrickou energií a z 1/3 dceřinou společností Burzy cenných papírů Praha, a.s.  PXE vlastní licenci komoditní burzy vydanou Ministerstvem průmyslu a obchodu („MPO“) a je tímto ministerstvem i pečlivě dozorována. V burzovní komoře PXE je reprezentant státu a jednání burzovní komory se též pravidelně účastní burzovní komisař MPO.',
    },
    {
        id: 8,
        tag: Tag.GENERAL,
        url: 'about-parc4u',
        header: 'Co je PARC4U?',
        shortContent: 'PARC4U je digitální platforma od PXE, která vám, jako koncovému spotřebiteli elektrické energie a zemního plynu, umožňuje najít optimálního dodavatele energií a uzavření závazných smluv na dodávku. Smlouvy jsou maximálně zjednodušené a srozumitelné bez jakýchkoliv háčků a kliček. Platforma funguje podobně jako burzovní obchodování se všemi výhodami, který tento typ obchodování nabízí. Podobně jako u burzovních obchodů samozřejmě platí, že jakmile si zvolíte svého dodavatele a uzavřete smlouvu, je smlouva platná na zvolenou dobu (tedy 1 nebo 2 roky).',
    },
    {
        id: 9,
        tag: Tag.GENERAL,
        url: 'what-is-not-parc4u',
        header: 'Co PARC4U není?',
        shortContent: 'PARC4U není srovnávač cen, který vám podstrčí „nejvýhodnější“ nabídku, protože nám tento zrovna „nejvýhodnější“ dodavatel za to zaplatil. V okamžiku, kdy si zvolíte jednu z našich nabídek, budeme kontrolovat, aby vámi zvolený dodavatel splnil, co slíbil a až se bude blížit konec vaší dodávky, nabídneme vám několik alternativ na její prodloužení jak u stávajícího, tak i u alternativních dodavatelů. Vy se sami rozhodnete, zdali jste byli se stávajícím dodavatelem spokojeni, nebo zda zkusíte někoho jiného.',
    },
    {
        id: 10,
        tag: Tag.GENERAL,
        url: 'benefits-of-parc4u',
        header: 'Jaké jsou výhody PARC4U?',
        shortContent: 'Vám, jako spotřebiteli, nabízí platforma produkty za ceny, které vychází z reálné situace na velkoobchodním trhu. To je dáno tím, že zde obchodují pouze renomovaní obchodníci, kteří mají přímo přístup na velkoobchodní trh.',
    },
    {
        id: 11,
        tag: Tag.GENERAL,
        url: 'benefits-of-parc4u',
        header: 'Proč vzniklo PARC4U?',
        shortContent: '1.     Vadilo nám, že přechod od jednoho dodavatele k druhému je velmi administrativně náročný. Proto jsme vytvořili produkt, který je jednoduchý, uživatelsky přívětivý a který bychom sami rádi používali.\n' +
            '2.     Vadí nám energetičtí šmejdi a jedním z úkolů burzy je kultivovat kulturnost obchodního prostředí. Bereme to vážně a proto v PARC4U najdete jen prověřené dodavatele, kteří se zde zavážou chovat kultivovaně. Nečekají vás žádné skryté kličky a ustanovení ve smlouvách ani žádné triky. Čeká vás pouze férová dodávka energie.',
    },
    {
        id: 12,
        tag: Tag.GENERAL,
        url: 'common-problems',
        header: 'S jakými problémy se můžu setkat?',
        shortContent: 'Největší problém můžete mít při uzavření první smlouvy na platformě PARC4U.  Řada dodavatelů se totiž brání odchodu svých zákazníků tím, že důsledně lpí na různých formalitách při vypovídání stávajících smluv. Další problém můžete mít s nalezením kopií svých stávajících smluv a správným provedením výpovědi. Jakmile se ale jednou přes tento krok přenesete, další změny smluv v PARC4U budou snadné. Všichni dodavatelé na této platformě se nám zavázali, že nebudou bránit migraci klientů v rámci platformy a provádět ji „digitálně na dvě kliknutí“.',
    },
    {
        id: 13,
        tag: Tag.GENERAL,
        url: 'unhappy',
        header: 'Co když nebudu plně spokojen?',
        shortContent: 'Budeme moc rádi, když nám o tom dáte vědět. Chceme provozovat platformu s férovými službami. Budeme váš případ posuzovat s maximální objektivitou. Je také potřeba brát v potaz, že PARC4U chce poskytovat služby burzovního charakteru, tj. naprosto férové obchodní podmínky pro obě strany obchodu.',
    },
    {
        id: 14,
        tag: Tag.GENERAL,
        url: 'errors',
        header: 'Co když něco nebude fungovat?',
        shortContent: 'Budeme moc rádi, když nám o tom opět dáte vědět. V našem zájmu je platformu v rámci možností zlepšovat budeme rádi, když nám k tomu pomůžete i vy.',
    },
    {
        id: 15,
        tag: Tag.GENERAL,
        url: 'future',
        header: 'Jak chcete PARC4U rozvíjet?',
        shortContent: 'Rádi bychom získali pro PARC4U dostatek zákazníků, což nám umožní další rozvoj a automatizaci poskytovaných služeb tak, abyste měli energie již pro vždy vyřešené.',
    },
    {
        id: 15,
        tag: Tag.GENERAL,
        url: 'price',
        header: 'Co vaše služby stojí?',
        shortContent: 'Pro vás, jako spotřebitele energií, je využívání PARC4U zcela zdarma.  Za obchodování přes PARC4U platí dodavatelé dle platného ceníku, který je pro všechny stejný a transparentní. Žádný z dodavatelů není nijak zvýhodňován.',
    },
    {
        id: 16,
        tag: Tag.SUPPLIER,
        url: 'bohemia-energy',
        header: 'Bohemia Energy',
        shortContent: 'První český alternativní dodavatel energií vstoupil na trh v roce 2005, elektřinu začal dodávat domácnostem v roce 2006 a o dva roky později i plyn. Dnes představuje největšího nezávislého alternativního dodavatele koncovým spotřebitelům. Bohemia Energy je aktivním účastníkem obchodování na velkoobchodním trhu, kde zajišťuje dodávky pro své zákazníky. Kromě výhodných cen energií zabezpečuje i komplexní zákaznický servis a také energetické poradenství.',
    },
    {
        id: 17,
        tag: Tag.SUPPLIER,
        url: 'energy-trading',
        header: 'EP Energy Trading',
        shortContent: 'EP Energy Trading patří do skupiny společností EP Infrastructure, která představuje druhého největšího výrobce elektrické energie v ČR a zabývá se také tranzitem, skladováním a distribucí zemního plynu. EP Energy Trading, a.s. patří k významným nezávislým dodavatelům elektřiny a plynu v České republice.',
    },
    {
        id: 18,
        tag: Tag.SUPPLIER,
        url: 'carbounion',
        header: 'Carbounion',
        shortContent: 'Carbounion působí na středoevropském trhu s energiemi již od roku 1998 a aktivity zahrnují mimo jiné obchod s uhlím, elektrickou energií a zemním plynem. Společnost je významným nezávislým obchodníkem s energetickými komoditami a patří mezi 100 nejvýznamnějších firem v ČR.',
    },
    {
        id: 19,
        tag: Tag.SUPPLIER,
        url: 'alpiq',
        header: 'Alpiq',
        shortContent: 'Švýcarská energetická skupina s více než 100letou tradicí patřící mezi přední evropské energetické společnosti s působností v téměř všech zemích Evropy. Vlastní a provozuje široké portfolio energetických zdrojů a v ČR mimo jiné nabízí dodávky elektrické energie a plynu koncovým zákazníkům.',
    },
    {
        id: 20,
        tag: Tag.SUPPLIER,
        url: 'prazska-plynarenska',
        header: 'Pražská plynárenská',
        shortContent: 'Jeden z nejvýznamnějších obchodníků, dodávající elektrickou energii a zemní plyn zákazníkům na celém území ČR.  Dodavatel nabízí také širokou škálu nekomoditních produktů a služeb.',
    },
    {
        id: 21,
        tag: Tag.SUPPLIER,
        url: 'yello-energy',
        header: 'Yello Energy',
        shortContent: 'Od roku 2012 pomáhá Yello na českém trhu desítkám tisíc klientů k férovým cenám. Jedná se o adaptaci německého konceptu Yello, který sází na jednoduchost a přímočarost. Nezatěžujeme se dlouhými řečmi ani náklady na kamenné pobočky. Náš tým je přitom snadno a stále dostupný online.\n' +
            'Yello je součástí Skupiny PRE..',
    },
];
