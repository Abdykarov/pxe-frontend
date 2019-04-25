import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { SupplyPointRequestComponent } from './supply-point-request.component';

describe('SupplyPointRequestComponent', () => {
    let component: SupplyPointRequestComponent;
    let fixture: ComponentFixture<SupplyPointRequestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SupplyPointRequestComponent,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupplyPointRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
