import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlSubMenuComponent } from './submenu.component';

describe('SlSubMenuComponent', () => {
  let component: SlSubMenuComponent;
  let fixture: ComponentFixture<SlSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlSubMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
