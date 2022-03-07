import { Component } from '@angular/core';
import { IQuestion, Tag } from 'src/app/services/model/faq.model';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { getConfigStepper } from 'src/common/utils';
import { offerConfig1, offerConfig2, offerConfig3 } from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointsOfferPageComponent {
    public offer1: IOffer = offerConfig1;
    public offer2: IOffer = offerConfig2;
    public offer3: IOffer = offerConfig3;

    public questions: IQuestion[] = [
        {
            id: 18,
            tag: {
                type: Tag.SUPPLIER,
                url: '',
                label: 'dodavatel',
                title: 'Otázky',
            },
            url: 'bohemia-energy',
            header: 'BOHEMIA ENERGY entity, s.r.o.',
            seoKeywords:
                'alternativní dodavatel, energií, elektřinu, plyn, nezávislého, Bohemia energy, zákazníky, komplexní zákaznický servis',
            shortContent:
                '<img class="mb-3" alt="logo - Bohemia Energy entity s.r.o." title="Bohemia Energy entity s.r.o.", width="185" src="/assets/images/suppliers/logo_bohemia-energy-hover.svg"/><p class=\'mb-0\'>První český alternativní dodavatel energií vstoupil na trh v roce 2005, elektřinu začal dodávat domácnostem v roce 2006 a o dva roky později i plyn. Dnes představuje největšího nezávislého alternativního dodavatele koncovým spotřebitelům. Bohemia Energy je aktivním účastníkem obchodování na velkoobchodním trhu, kde zajišťuje dodávky pro své zákazníky. Kromě výhodných cen energií zabezpečuje i komplexní zákaznický servis a také energetické poradenství.</p>',
            vatNumber: '27386732',
        },
        {
            id: 19,
            tag: {
                type: Tag.SUPPLIER,
                url: '',
                label: 'dodavatel',
                title: 'Otázky',
            },
            url: 'energy-trading',
            header: 'EP Energy Trading, a.s.',
            seoKeywords:
                'EP energy, EP, energy, EP energy trading, elektrické energie, v ČR, zemního plynu, plynu',
            shortContent:
                '<img class="mb-3" alt="logo - EP Energy Trading a.s." title="EP Energy Trading a.s.", width="75" src="/assets/images/suppliers/logo_ep-energy-trading-hover.svg"/><p class=\'mb-0\'>EP Energy Trading patří do skupiny společností EP Infrastructure, která představuje druhého největšího výrobce elektrické energie v ČR a zabývá se také tranzitem, skladováním a distribucí zemního plynu. EP Energy Trading, a.s. patří k významným nezávislým dodavatelům elektřiny a plynu v České republice.</p>',
            vatNumber: '27386643',
        },
        {
            id: 20,
            tag: {
                type: Tag.SUPPLIER,
                url: '',
                label: 'dodavatel',
                title: 'Otázky',
            },
            url: 'carbounion',
            header: 'CARBOUNION BOHEMIA, spol. s r. o.',
            seoKeywords:
                'Carbounion, energemi, obchod s uhlím, elektrickou energií, komoditami, 100 nejvýznamnějších firem v ČR',
            shortContent:
                '<img class="mb-3" title="CARBOUNION BOHEMIA, spol. s r. o." alt="logo - EP Energy Trading a.s." title="CARBOUNION BOHEMIA, spol. s r. o.", width="70" src="/assets/images/suppliers/logo_carbounion-bohemia@2x-hover.png"/><p class=\'mb-0\'>Carbounion působí na středoevropském trhu s energiemi již od roku 1998 a aktivity zahrnují mimo jiné obchod s uhlím, elektrickou energií a zemním plynem. Společnost je významným nezávislým obchodníkem s energetickými komoditami a patří mezi 100 nejvýznamnějších firem v ČR.</p>',
            vatNumber: '25692917',
        },
        {
            id: 21,
            tag: {
                type: Tag.SUPPLIER,
                url: '',
                label: 'dodavatel',
                title: 'Otázky',
            },
            url: 'alpiq',
            header: 'Alpiq Retail CZ s.r.o.',
            seoKeywords:
                'Alpiq, Švýcarská, energetická skupina, portfolio, dodávky, elektrické energie, plynu',
            shortContent:
                '<img class="mb-3" alt="logo - Alpiq CZ" title="Alpiq CZ", width="81" src="/assets/images/suppliers/logo_alpiq-hover.svg"/><p class=\'mb-0\'>Švýcarská energetická skupina s více než 100letou tradicí patřící mezi přední evropské energetické společnosti s působností v téměř všech zemích Evropy. Vlastní a provozuje široké portfolio energetických zdrojů a v ČR mimo jiné nabízí dodávky elektrické energie a plynu koncovým zákazníkům.</p>',
            vatNumber: '08183929',
        },
        {
            id: 22,
            tag: {
                type: Tag.SUPPLIER,
                url: '',
                label: 'dodavatel',
                title: 'Otázky',
            },
            url: 'prazska-plynarenska',
            header: 'Pražská plynárenská, a.s.',
            seoKeywords:
                'Pražská plynárenská, elektrickou energii, zemní plyn, nekomoditních produktů, služeb',
            shortContent:
                '<img class="mb-3" alt="logo - Pražská plynárenská a.s." title="Pražská plynárenská a.s.", width="129" src="/assets/images/suppliers/logo_prazska-plynarenska-hover.svg"/><p class=\'mb-0\'>Jeden z nejvýznamnějších obchodníků, dodávající elektrickou energii a zemní plyn zákazníkům na celém území ČR.  Dodavatel nabízí také širokou škálu nekomoditních produktů a služeb.</p>',
            vatNumber: '60193492',
        },
        {
            id: 23,
            tag: {
                type: Tag.SUPPLIER,
                url: '',
                label: 'dodavatel',
                title: 'Otázky',
            },
            url: 'yello-energy',
            header: 'eYello CZ, k.s.',
            seoKeywords:
                'Yello Energy, férovým cenám, jednoduchost, přímočarost, náklady, kamenné pobočky, Skupiny PRE',
            shortContent:
                '<img class="mb-3" alt="logo - Yello Energy" title="Yello Energy", width="56" src="/assets/images/suppliers/logo_yello-energy-hover.svg"/><p class=\'mb-0\'>Od roku 2012 pomáhá Yello na českém trhu desítkám tisíc klientů k férovým cenám. Jedná se o adaptaci německého konceptu Yello, který sází na jednoduchost a přímočarost. Nezatěžujeme se dlouhými řečmi ani náklady na kamenné pobočky. Náš tým je přitom snadno a stále dostupný online. Yello je součástí Skupiny PRE.</p>',
            vatNumber: '25054040',
        },
        {
            id: 24,
            tag: {
                type: Tag.SUPPLIER,
                url: '',
                label: 'dodavatel',
                title: 'Otázky',
            },
            url: 'pxe-ctvrty-dodavatel',
            header: 'PXE Ctvrty dodavatel',
            seoKeywords: 'test',
            shortContent:
                "<p class='mb-0'>První český alternativní dodavatel energií vstoupil na trh v roce 2005, elektřinu začal dodávat domácnostem v roce 2006 a o dva roky později i plyn. Dnes představuje největšího nezávislého alternativního dodavatele koncovým spotřebitelům. Bohemia Energy je aktivním účastníkem obchodování na velkoobchodním trhu, kde zajišťuje dodávky pro své zákazníky. Kromě výhodných cen energií zabezpečuje i komplexní zákaznický servis a také energetické poradenství</p>",
            vatNumber: '23456780',
            isTestData: true,
        },
        {
            id: 25,
            tag: {
                type: Tag.SUPPLIER,
                url: '',
                label: 'dodavatel',
                title: 'Otázky',
            },
            url: 'parc-dodavatel',
            header: 'PARC 4 U dodavatel 2',
            seoKeywords:
                'Yello Energy, férovým cenám, jednoduchost, přímočarost, náklady, kamenné pobočky, Skupiny PRE',
            fullContent:
                'Dlouhy text - Yello Energy, férovým cenám, jednoduchost, přímočarost, náklady, kamenné pobočky, Skupiny PRE',
            shortContent:
                '<img class="mb-3" width="70" src="/assets/images/suppliers/logo_eon-hover.svg"/><p class=\'mb-0\'>Od roku 2012 pomáhá Yello na českém trhu desítkám tisíc klientů k férovým cenám. Jedná se o adaptaci německého konceptu Yello, který sází na jednoduchost a přímočarost. Nezatěžujeme se dlouhými řečmi ani náklady na kamenné pobočky. Náš tým je přitom snadno a stále dostupný online. Yello je součástí Skupiny PRE.</p>',
            oneOfMostVisited: true,
            vatNumber: '89754644',
            isTestData: true,
        },
    ];

    public progressbarConfig = getConfigStepper(ProgressStatus.OFFER_STEP);

    public click = (data) => {
        console.log('clicked', data);
    };
}
