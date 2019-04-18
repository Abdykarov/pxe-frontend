import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SecuringYourDataComponent } from './securing-your-data.component';

describe('SecuringYourDataComponent', () => {
    let component: SecuringYourDataComponent;
    let fixture: ComponentFixture<SecuringYourDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SecuringYourDataComponent,
            ],
            imports: [
                LayoutContainerModule,
                RouterTestingModule.withRoutes([]),
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
