import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';
import { CONSTS } from 'src/app/app.constants';

import { AuthService } from 'src/app/services/auth.service';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointLocalStorageService {
    private supplyPointSubject = new Subject<any>();
    private removeSupplyPointSubject = new Subject<any>();

    constructor(
        private authService: AuthService,
    ) {}

    public getSupplyPointStream = () => this.supplyPointSubject.asObservable();
    public removeSupplyPointSubjectStream = () => this.supplyPointSubject.asObservable();
    public loadSupplyPoint = () => this.supplyPointSubject.next(this.getSupplyPoint());
    public removeSupplyPointAct = () => this.removeSupplyPointSubject.next();
// je z dobreho utu?
    public getSupplyPoint = () => {
        try {
            const item = localStorage.getItem(CONSTS.LOCAL_STORAGE.SUPPLY_POINT_PARTIAL_FORM);
            return JSON.parse(
                CryptoJS.AES.decrypt(
                    item,
                    this.authService.currentUserValue.email,
                    CONSTS.CRYPTO.SALT.toString(),
                    CONSTS.CRYPTO.IV.toString(),
                )
                    .toString(
                        CryptoJS.enc.Utf8,
                    ),
            ) || {};
        } catch (e) {
            return {};
        }
    }

    public updateSupplyPoint = (supplyPointForm: object) => {
        if (supplyPointForm) {
            localStorage.setItem(
                CONSTS.LOCAL_STORAGE.SUPPLY_POINT_PARTIAL_FORM,
                CryptoJS.AES.encrypt(
                    JSON.stringify({
                        supplyPointForm,
                        email: this.authService.currentUserValue.email,
                    }),
                    this.authService.currentUserValue.email,
                    CONSTS.CRYPTO.SALT.toString(),
                    CONSTS.CRYPTO.IV.toString(),
                ),
            );
        }
    }

    public removeSupplyPoint = () => localStorage.removeItem(CONSTS.LOCAL_STORAGE.SUPPLY_POINT_PARTIAL_FORM);

}
