import { Component } from '@angular/core';

import { configStepper } from './config';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    templateUrl: './page.html',
    styleUrls: ['../../../assets/scss/05_pages/payment-verification.scss'],
})
export class PaymentVerificationPageComponent {
    public stepperProgressConfig = configStepper;
    public showPaymentInfo = true;

    public bannerType = BannerTypeImages;
    public bannerTitle = 'Čekáme na doručení vaší ověřovací platby do 15.11.2018';
    public bannerDescription = 'Platba u nás může být hned, ale z některé banky to může trvat až 3 dny a my vás nechceme zdržovat.' +
        'Okno aplikace můžete nyní zavřít a až platbu obdržíme, dáme vám vědět na e-mail.';

    public togglePaymentInfo = (event) => {
        this.showPaymentInfo = !this.showPaymentInfo;
    }
}
