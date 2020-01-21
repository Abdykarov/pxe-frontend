import {
    Directive,
    ElementRef,
    HostListener, ViewContainerRef,
} from '@angular/core';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';

@Directive({
    selector: '[lndSBiometricsDirective]',
})
export class SBiometricsDirective {

    @HostListener('keydown', ['$event']) keydown = (event: any) => {
        console.log('KEY DOWN');
        console.log(event);
        this.sAnalyticsService.sBioKeyDown(event);
    }

    @HostListener('keyup', ['$event']) keyup = (event: any) => {
        console.log('KEY UP');
        console.log(event);
        this.sAnalyticsService.sBioKeyUp(event);
    }

    @HostListener('focus', ['$event']) focus = (event: any) => {
        console.log('FOCUS');
        console.log(event);
        this.sAnalyticsService.sBioFocus(event);
    }

    @HostListener('blur', ['$event']) blur = (event: any) => {
        console.log('BLUR');
        console.log(event);
        this.sAnalyticsService.sBioBlur(event);
    }

    constructor(
        private sAnalyticsService: SAnalyticsService,
    ) {}
}
