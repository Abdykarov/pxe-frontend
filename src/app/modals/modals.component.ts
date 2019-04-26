import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    ViewChild,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { AddModalDirective } from './add-modal.directive';
import { ModalsLoaderService } from './modals-loader.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'lnd-modal-dynamic',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent extends AbstractComponent {
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

    public destroyComponent() {
        if (this.component) {
            this.component.destroy();
        }
        this.component = null;
        // window.dispatchEvent(new Event('resize'));
    }
}
