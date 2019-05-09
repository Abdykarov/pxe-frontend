import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SupplyPointsComponent } from './supply-points.component';

describe('SupplyPointComponent', () => {
    let component: SupplyPointsComponent;
    let fixture: ComponentFixture<SupplyPointsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SupplyPointsComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupplyPointsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
