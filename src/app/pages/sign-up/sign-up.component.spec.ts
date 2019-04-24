import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { ApolloModule } from 'apollo-angular';

import { SignUpComponent } from './sign-up.component';
import { SignUpFormContainerModule } from 'src/common/containers/form-container/sign-up-form/sign-up-form-container.module';

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SignUpComponent,
            ],
            imports: [
                ApolloModule,
                SignUpFormContainerModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
