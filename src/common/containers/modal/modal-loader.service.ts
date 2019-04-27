import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ModalLoaderService {
    private components = {};
    public showModal: Subject<any> = new Subject();
    public loadModalComponent = (component: string) => this.components[component];
}
