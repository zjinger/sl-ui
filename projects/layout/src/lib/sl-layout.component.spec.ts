import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlLayoutComponent } from './sl-layout.component';

describe('SlLayoutComponent', () => {
  let component: SlLayoutComponent;
  let fixture: ComponentFixture<SlLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
