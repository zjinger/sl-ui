import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlMenuNodesComponent } from './menu-nodes.component';

describe('SlMenuNodesComponent', () => {
  let component: SlMenuNodesComponent;
  let fixture: ComponentFixture<SlMenuNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlMenuNodesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlMenuNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
