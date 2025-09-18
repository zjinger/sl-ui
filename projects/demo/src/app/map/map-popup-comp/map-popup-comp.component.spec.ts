import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPopupCompComponent } from './map-popup-comp.component';

describe('MapPopupCompComponent', () => {
  let component: MapPopupCompComponent;
  let fixture: ComponentFixture<MapPopupCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPopupCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPopupCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
