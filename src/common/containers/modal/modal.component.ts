import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    ViewChild,
} from '@angular/core';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AddModalDirective } from './add-modal.directive';
import { ModalService } from './modal.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

@Component({
    selector: 'lnd-modal-dynamic',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends AbstractComponent {
    @ViewChild(AddModalDirective)
    public addModal: AddModalDirective;

    @Input()
    public isModalOpen: boolean;

    @Input()
    public modalTitle: string;

    public component: ComponentRef<any>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private modalLoaderService: ModalService,
        private overlayService: OverlayService,
    ) {
        super();
        this.modalLoaderService.showModal$
            .pipe(
                takeUntil(this.destroy$),
                filter(R_.isNotNil),
            )
            .subscribe(modal => {
                if (this.component) {
                    this.component.destroy();
                }
                if (!this.addModal) {
                    return;
                }
                const componentToLoad = R.is(String, modal.component) ?
                    this.modalLoaderService.loadModalComponent(modal.component) : modal.component;
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToLoad);
                const modalElmRef = this.addModal.viewContainerRef;
                modalElmRef.clear();
                this.component = modalElmRef.createComponent(componentFactory);

                this.component.instance.modalOpen = true;
                if (modal.instanceData) {
                    this.component.instance.instanceData = modal.instanceData;
                }
                this.overlayService.toggleOverlay(true)
                    .pipe(
                        takeUntil(this.destroy$),
                    )
                    .subscribe();
                this.modalLoaderService.closeModal$.subscribe(_ => {
                    this.modalLoaderService.setCloseModalData({
                        modalType: modal.modalType,
                        confirmed: false,
                        ...modal.instanceData,
                    });
                    this.destroyComponent();
                    this.overlayService.toggleOverlay(false)
                        .pipe(
                            takeUntil(this.destroy$),
                        )
                        .subscribe();
                });
                this.component.instance.closeModal.subscribe((val) => {
                    this.modalLoaderService.setCloseModalData({
                        modalType: modal.modalType,
                        confirmed: val,
                        ...modal.instanceData,
                    });
                    this.destroyComponent();
                    this.overlayService.toggleOverlay(false)
                        .pipe(
                            takeUntil(this.destroy$),
                        )
                        .subscribe();
                });
                this.component.changeDetectorRef.detectChanges();
        });
    }

    public destroyComponent = () => {
        if (this.component) {
            this.component.destroy();
        }
        this.component = null;
    }
}
