import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { DecimalPipe } from '@angular/common';

import { config } from 'src/common/containers/map-coverage-container/map-coverage-container.config';
import { MapCoverageComponent } from './map-coverage.component';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { TabsModule } from '../tabs/tabs.module';

describe('MapCoverageComponent', () => {
    let component: MapCoverageComponent;
    let fixture: ComponentFixture<MapCoverageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MapCoverageComponent,
            ],
            imports: [
                PipesModule,
                TabsModule,
            ],
            providers: [
                DecimalPipe,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapCoverageComponent);
        component = fixture.componentInstance;
        component.config = config;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
