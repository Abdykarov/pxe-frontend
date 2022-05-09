import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone',
})
export class PhonePipe implements PipeTransform {
    transform(phoneNumber: string): string {
        phoneNumber = phoneNumber.trim();

        switch (phoneNumber.length) {
            case 9:
                return phoneNumber.replace(
                    /(\d{3})(\d{3})(\d{3})/,
                    '$1\xa0$2\xa0$3'
                );
            case 13:
                return phoneNumber.replace(
                    /(\+\d{3})(\d{3})(\d{3})(\d{3})/,
                    '$1\xa0$2\xa0$3\xa0$4'
                );
            default:
                return phoneNumber;
        }
    }
}
