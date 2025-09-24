import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlMenuItemComponent } from './menu-item.component';

describe('SlMenuItemComponent', () => {
  let component: SlMenuItemComponent;
  let fixture: ComponentFixture<SlMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
