import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConfirmModalComponent } from './modals/confirm/confirm-modal.component';
import { ICloseModalData, IShowModal } from './modals/model/modal.model';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private components = {
        ConfirmModalComponent: ConfirmModalComponent,
    };
    public closeModalData$ = new BehaviorSubject(<ICloseModalData>null);
    public showModal$: Subject<IShowModal> = new Subject();
    public closeModal$: Subject<IShowModal> = new Subject();

    public loadModalComponent = (component: string) =>
        this.components[component];
    public setCloseModalData = (data: ICloseModalData) =>
        this.closeModalData$.next(data);
}
