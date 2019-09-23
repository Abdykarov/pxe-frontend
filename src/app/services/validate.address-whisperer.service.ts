import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ValidateAddressWhispererService {

    private validateBySelfFormsSubject = new Subject<string>();

    public validateBySelfForms$ = this.validateBySelfFormsSubject.asObservable();

    validateBySelfForms = () => {
        this.validateBySelfFormsSubject.next();
    }

}
