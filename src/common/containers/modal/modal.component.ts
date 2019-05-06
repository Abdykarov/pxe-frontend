import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    ViewChild,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AddModalDirective } from './add-modal.directive';
import { ModalLoaderService } from './modal-loader.service';
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
        private modalLoaderService: ModalLoaderService,
        private overlayService: OverlayService,
    ) {
        super();
        this.modalLoaderService.showModal.subscribe(type => {
            if (this.component) {
                this.component.destroy();
            }
            if (!this.addModal) {
                return;
            }
            const componentToLoad = type.component ? type.component : this.modalLoaderService.loadModalComponent(type);
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToLoad);
            const modalElmRef = this.addModal.viewContainerRef;
            modalElmRef.clear();
            this.component = modalElmRef.createComponent(componentFactory);

            this.component.instance.modalOpen = true;
            if (type.instanceData) {
                this.component.instance.instanceData = type.instanceData;
            }
            this.overlayService.toggleOverlay(true)
                .pipe(
                    takeUntil(this.destroy$),
                )
                .subscribe();
            this.component.instance.closeModal.subscribe(() => {
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
