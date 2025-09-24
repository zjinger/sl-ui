import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlFooterComponent } from './sl-footer.component';

describe('SlFooterComponent', () => {
  let component: SlFooterComponent;
  let fixture: ComponentFixture<SlFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
