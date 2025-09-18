import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlSiderComponent } from './sl-sider.component';

describe('SlSiderComponent', () => {
  let component: SlSiderComponent;
  let fixture: ComponentFixture<SlSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlSiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
