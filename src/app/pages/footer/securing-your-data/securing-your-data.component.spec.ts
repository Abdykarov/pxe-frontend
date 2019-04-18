import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { SecuringYourDataComponent } from './securing-your-data.component';
import {
    NotificationLayoutContainerModule,
} from 'src/common/containers/notification-layout-container/notification-layout-container.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('SecuringYourDataComponent', () => {
    let component: SecuringYourDataComponent;
    let fixture: ComponentFixture<SecuringYourDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SecuringYourDataComponent,
            ],
            imports: [
                NotificationLayoutContainerModule,
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
