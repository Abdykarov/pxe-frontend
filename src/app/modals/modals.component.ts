import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    ViewChild,
} from '@angular/core';

import { AddModalDirective } from './add-modal.directive';
import { ModalsLoaderService } from './modals-loader.service';
import { OverlayService } from '../../common/graphql/services/overlay.service';

@Component({
    selector: 'lnd-modal-dynamic',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent {
    @ViewChild(AddModalDirective) public addModal: AddModalDirective;

    @Input()
    public isModalOpen: boolean;

    @Input()
    public modalTitle: string;

    public component: ComponentRef<any>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private modalLoaderService: ModalsLoaderService,
        private overlayService: OverlayService,
    ) {
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
            const $ovrOpn = this.overlayService.toggleOverlay(true).subscribe();
            $ovrOpn.unsubscribe();
            this.component.instance.closeModal.subscribe(() => {
                this.destroyComponent();
                const $ovrClose = this.overlayService.toggleOverlay(false).subscribe();
                $ovrClose.unsubscribe();
            });
            this.component.changeDetectorRef.detectChanges();
        });
    }

    public destroyComponent() {
        if (this.component) {
            this.component.destroy();
        }
        this.component = null;
        // window.dispatchEvent(new Event('resize'));
    }
}
