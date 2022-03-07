import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthService } from 'src/app/services/auth.service';
import { IJwtPayload } from 'src/app/services/model/auth.model';

@Injectable({
    providedIn: 'root',
})
export class CryptoService {
    constructor(private authService: AuthService) {
        authService.currentUserSubject$.subscribe(
            (jwtPayloadSubjectSubject: IJwtPayload) => {
                authService.gtmService.setUserId(
                    this.hashUserId(jwtPayloadSubjectSubject?.email)
                );
            }
        );
    }

    public hashUserId = (id: string): string =>
        id ? CryptoJS.SHA3(id).toString() : null;

    get hashedUserId(): string {
        return this.hashUserId(this.authService?.currentUserValue?.email);
    }
}
