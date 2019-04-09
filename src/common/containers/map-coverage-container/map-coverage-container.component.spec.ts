import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { MapCoverageContainerComponent } from './map-coverage-container.component';

describe('MapCoverageContainerComponent', () => {
    let component: MapCoverageContainerComponent;
    let fixture: ComponentFixture<MapCoverageContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ MapCoverageContainerComponent ],
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
