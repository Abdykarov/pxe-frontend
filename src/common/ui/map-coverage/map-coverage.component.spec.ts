import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { MapCoverageComponent } from './map-coverage.component';

describe('MapCoverageComponent', () => {
    let component: MapCoverageComponent;
    let fixture: ComponentFixture<MapCoverageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ MapCoverageComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapCoverageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
