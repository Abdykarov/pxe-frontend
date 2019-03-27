import { Component } from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

// own components
import { ButtonComponent } from './button.component';

// own modules
import { ButtonModule } from './button.module';
import { IButtonSize } from './models/size.model';
import { IButtonType } from './models/type.model';

describe('ButtonComponent', () => {

    let button: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonComponent,
            ],
        });

        fixture = TestBed.createComponent(ButtonComponent);
        button = fixture.componentInstance;
    });

    it('should create', () => {
        expect(button).toBeDefined();
    });

    it('should apply class based on type attribute', async(() => {
        const buttonEl = fixture.debugElement.nativeElement.querySelector('.btn');

        button.type = IButtonType.PRIMARY;
        fixture.detectChanges();
        expect(buttonEl.classList).toContain('btn-primary');

        button.type = IButtonType.SECONDARY;
        fixture.detectChanges();
        expect(buttonEl.classList).toContain('btn-secondary');
    }));

    it('should apply class based on size attribute', async(() => {
        const buttonEl = fixture.debugElement.nativeElement.querySelector('.btn');

        button.size = IButtonSize.SMALL;
        fixture.detectChanges();
        expect(buttonEl.classList).toContain('btn-sm');
    }));

    it('should apply class based on isOutlined attribute', async(() => {
        const buttonEl = fixture.debugElement.nativeElement.querySelector('.btn');

        button.hasOutline = true;
        button.type = IButtonType.PRIMARY;
        fixture.detectChanges();
        expect(buttonEl.classList).toContain('btn-outline-primary');
    }));
});

/** Test component **/
@Component({
    selector: 'lnd-test-app',
    template: `
        <lnd-button (action)="increment()" isDisabled="false"></lnd-button>
    `,
})
class TestAppComponent {
    clickCount = 0;

    increment() {
        this.clickCount++;
    }
}

describe('ButtonComponent click test', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ButtonModule,
            ],
            declarations: [
                TestAppComponent,
            ],
        });

        TestBed.compileComponents();
    }));

    it('should handle a click on the button', () => {
        const fixture = TestBed.createComponent(TestAppComponent);
        const testComponent = fixture.debugElement.componentInstance;
        const buttonDebugElement = fixture.debugElement.nativeElement.querySelector('.btn');

        buttonDebugElement.click();
        expect(testComponent.clickCount).toBe(1);
    });

    it('should not increment if disabled', () => {
        const fixture = TestBed.createComponent(TestAppComponent);
        const testComponent = fixture.debugElement.componentInstance;
        const buttonDebugElement = fixture.debugElement.nativeElement.querySelector('.btn');

        testComponent.isDisabled = true;
        fixture.detectChanges();
        buttonDebugElement.click();
        expect(testComponent.clickCount).toBe(0);
    });
});
