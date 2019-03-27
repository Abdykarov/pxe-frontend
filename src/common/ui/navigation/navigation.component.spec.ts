import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { INavigationConfig } from './models/navigation.model';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {

    const navigationItem = {
        'url': '/url/1',
        'label': 'Url 1',
        'icon': 'home',
    };

    const navigationItemWithChildren = {
        'id': 'menu2',
        'label': 'Url 2',
        'icon': 'chart-bars',
        'children': [
            {
                'url': '/menu2/a',
                'label': 'A',
            },
            {
                'url': '/menu2/b',
                'label': 'B',
            },
        ],
    };

    const navigationConfig: INavigationConfig = [
        [
            navigationItem,
            navigationItemWithChildren,
        ],
    ];

    let navigation: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavigationComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
        });
        fixture = TestBed.createComponent(NavigationComponent);
        navigation = fixture.componentInstance;
        navigation.config = navigationConfig;
    });

    it('should create', () => {
        expect(navigation).toBeDefined();
    });

    it('raises openitem event when clicked on second item ', async(() => {
        fixture.detectChanges();
        navigation.openItem.subscribe(itemClicked => expect(itemClicked).toBe(navigationItemWithChildren));

        const itemWithChildren = fixture.nativeElement.querySelector('a[aria-controls=menu2]');
        itemWithChildren.click();
    }));

    it('unsets itemopened when clicked on opened item ', async(() => {
        navigation.itemOpened = navigationItemWithChildren;
        fixture.detectChanges();

        navigation.openItem.subscribe(itemClicked => expect(itemClicked).toBe(null));

        const itemWithChildren = fixture.nativeElement.querySelector('a[aria-controls=menu2]');
        itemWithChildren.click();
    }));

    it('sets class when menu is opened', async(() => {
        navigation.isMenuOpen = true;
        fixture.detectChanges();

        const itemWithChildren = fixture.nativeElement.querySelector('aside');
        expect(itemWithChildren.classList).toContain('aside--open');
    }));
});
