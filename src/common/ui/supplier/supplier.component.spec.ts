import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { SuplierComponent } from './map-coverage.component';

describe('MapCoverageComponent', () => {
    let component: SuplierComponent;
    let fixture: ComponentFixture<SuplierComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ SuplierComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuplierComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
