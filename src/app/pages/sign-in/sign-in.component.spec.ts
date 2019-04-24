import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { ApolloModule } from 'apollo-angular';

import { SignInComponent } from './sign-in.component';
import { SignInFormContainerModule } from 'src/common/containers/form-container/sign-in-form/sign-in-form-container.module';

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SignInComponent,
            ],
            imports: [
                ApolloModule,
                SignInFormContainerModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
