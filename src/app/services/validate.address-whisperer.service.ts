import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ValidateAddressWhispererService {
    private submitFormSubject = new Subject<string>();

    private validateBySelfFormsSubject = new Subject<string>();

    public validateBySelfForms$ = this.validateBySelfFormsSubject.asObservable();
    public submitFormSubjects$ = this.submitFormSubject.asObservable();

    validateBySelfForms = () => {
        this.validateBySelfFormsSubject.next();
    }

    submitForm = () => {
        this.validateBySelfFormsSubject.next();
    }

}
