import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { MapCoverageContainerComponent } from './map-coverage-container.component';
import { MapCoverageModule } from 'src/common/ui/map-coverage/map-coverage.module';
import {
    NotificationLayoutContainerModule,
} from 'src/common/containers/notification-layout-container/notification-layout-container.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

describe('MapCoverageContainerComponent', () => {
    let component: MapCoverageContainerComponent;
    let fixture: ComponentFixture<MapCoverageContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MapCoverageContainerComponent,
            ],
            imports: [
                MapCoverageModule,
                NotificationLayoutContainerModule,
                RouterTestingModule.withRoutes([]),
                SupplierModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapCoverageContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
