import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CookiesPolicyComponent } from './cookies-policy.component';
import {
    NotificationLayoutContainerModule,
} from 'src/common/containers/notification-layout-container/notification-layout-container.module';

describe('CookiesPolicyComponent', () => {
    let component: CookiesPolicyComponent;
    let fixture: ComponentFixture<CookiesPolicyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CookiesPolicyComponent,
            ],
            imports: [
                NotificationLayoutContainerModule,
                RouterTestingModule.withRoutes([]),
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CookiesPolicyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
