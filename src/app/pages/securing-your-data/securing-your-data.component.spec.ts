import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { SecuringYourDataComponent } from './securing-your-data.component';

describe('SecuringYourDataComponent', () => {
    let component: SecuringYourDataComponent;
    let fixture: ComponentFixture<SecuringYourDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SecuringYourDataComponent,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecuringYourDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
