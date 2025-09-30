import { TestBed } from '@angular/core/testing';

import { SubMenuService } from './submenu.service';

describe('SubMenuService', () => {
  let service: SubMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
