import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CONSTS } from 'src/app/app.constants';
import { CRYPTO } from 'src/common/constants/crypto.constants';
import { AuthService } from 'src/common/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class PersonalInfoLocalStorageService {
    constructor(private authService: AuthService) {}

    public addPersonalInfo = (
        supplyPointId: string,
        personalInfoForm: object
    ) => {
        if (supplyPointId && personalInfoForm) {
            const idOfPersonalInfoForSupplyPointId =
                this.getIdOfPersonalInfoForSupplyPointId(supplyPointId);
            localStorage.setItem(
                idOfPersonalInfoForSupplyPointId,
                CryptoJS.AES.encrypt(
                    JSON.stringify(personalInfoForm),
                    this.authService.currentUserValue.email,
                    CRYPTO.SALT.toString(),
                    CRYPTO.IV.toString()
                )
            );
        }
    };

    public getPersonalInfo = (supplyPointId: string) => {
        try {
            const idOfPersonalInfoForSupplyPointId =
                this.getIdOfPersonalInfoForSupplyPointId(supplyPointId);
            const item = localStorage.getItem(idOfPersonalInfoForSupplyPointId);
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

    private getIdOfPersonalInfoForSupplyPointId = (supplyPointId) =>
        CONSTS.LOCAL_STORAGE.PERSONAL_INFO_PARTIAL_FORM_PREFIX + supplyPointId;
}
