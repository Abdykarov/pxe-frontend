import {
    Pipe,
    PipeTransform,
} from '@angular/core';

@Pipe({
    name: 'accountNumber',
})
export class AccountNumberPipe implements PipeTransform {
    transform(accountNumber: string, accountPrefix: string, bankCode?: string): string {
        const _accountPrefix = accountPrefix ? accountPrefix.toString().replace(/^0+/, '') : accountPrefix;
        const _accountNumber = accountNumber.toString().replace(/^0+/, '');
        return `${_accountPrefix ? _accountPrefix + '-' : ''}${_accountNumber}${bankCode ? '/' + bankCode : ''}`;
    }
}
