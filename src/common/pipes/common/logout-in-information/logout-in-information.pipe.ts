import { Pipe, PipeTransform } from '@angular/core';
import { PluralPipe } from 'src/common/pipes/common/plurar/plural.pipe';

@Pipe({
    name: 'logoutInInformation',
})
export class LogoutInInformationPipe implements PipeTransform {
    constructor(private pluralPipe: PluralPipe) {}

    transform(secs: number): string {
        const minutes = Math.floor(secs / 60);
        const sec = secs % 60;
        let text = '';
        let secText = '';
        let minText = '';

        if (minutes !== 0) {
            minText = `${minutes} ${this.pluralPipe.transform(
                minutes,
                'minute'
            )}`;
            text = minText;
        }

        if (minutes !== 0 && sec !== 0) {
            text += ' a ';
        }

        if (sec !== 0) {
            secText = `${sec} ${this.pluralPipe.transform(sec, 'sec')}`;
            text += secText;
        }

        return text;
    }
}
