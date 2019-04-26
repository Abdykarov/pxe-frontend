import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { MapCoverageContainerComponent } from './map-coverage-container.component';
import { MapCoverageModule } from 'src/common/ui/map-coverage/map-coverage.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SupplierContainerModule } from '../supplier-conteiner/supplier-conteiner.module';

describe('MapCoverageContainerComponent', () => {
    let component: MapCoverageContainerComponent;
    let fixture: ComponentFixture<MapCoverageContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MapCoverageContainerComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                MapCoverageModule,
                SupplierContainerModule,
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
