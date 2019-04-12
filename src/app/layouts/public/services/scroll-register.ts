import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScrollRegisterService {
    private scrollRegister = new Subject<string>();

    clickedOnRegistrationStream() {
       return this.scrollRegister.asObservable();
    }

    clickedOnRegistration() {
        this.scrollRegister.next();
    }
}
