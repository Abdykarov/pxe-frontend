import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';
import { CONSTS } from 'src/app/app.constants';
import { CRYPTO } from 'src/common/constants/crypto.constants';
import { AuthService } from 'src/common/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointLocalStorageService {
    private supplyPointSubject$ = new Subject<any>();
    private removeSupplyPointSubject$ = new Subject<any>();
    public isEdit = false;

    constructor(private authService: AuthService) {}

    public getSupplyPointStream = () => this.supplyPointSubject$.asObservable();
    public loadSupplyPointAction = () =>
        this.supplyPointSubject$.next(this.getSupplyPoint());
    public removeSupplyPointStream = () =>
        this.removeSupplyPointSubject$.asObservable();

    public getSupplyPoint = () => {
        try {
            const item = localStorage.getItem(
                CONSTS.LOCAL_STORAGE.SUPPLY_POINT_PARTIAL_FORM
            );
            return (
                JSON.parse(
                    CryptoJS.AES.decrypt(
                        item,
                        this.authService.currentUserValue.email,
                        CRYPTO.SALT.toString(),
                        CRYPTO.IV.toString()
                    ).toString(CryptoJS.enc.Utf8)
                ) || {}
            );
        } catch (e) {
            return {};
        }
    };

    public updateSupplyPoint = (supplyPointForm: object) => {
        if (supplyPointForm && !this.isEdit) {
            localStorage.setItem(
                CONSTS.LOCAL_STORAGE.SUPPLY_POINT_PARTIAL_FORM,
                CryptoJS.AES.encrypt(
                    JSON.stringify({
                        supplyPointForm,
                        email: this.authService.currentUserValue.email,
                    }),
                    this.authService.currentUserValue.email,
                    CRYPTO.SALT.toString(),
                    CRYPTO.IV.toString()
                )
            );
        }
    };

    public removeSupplyPoint = () => {
        localStorage.removeItem(CONSTS.LOCAL_STORAGE.SUPPLY_POINT_PARTIAL_FORM);
        this.removeSupplyPointSubject$.next();
    };
}
