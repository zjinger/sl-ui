import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlContentComponent } from './sl-content.component';

describe('SlContentComponent', () => {
  let component: SlContentComponent;
  let fixture: ComponentFixture<SlContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
