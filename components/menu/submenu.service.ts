import { inject, Injectable } from '@angular/core';
import { SlMenuService } from './menu.service';
import { SlSafeAny } from 'ngx-sl-ui/core/types';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class SlSubmenuService {
  public readonly slMenuService = inject(SlMenuService);
  private readonly slHostSubmenuService = inject(SlSubmenuService, { optional: true, skipSelf: true });
  isCurrentSubMenuOpen$ = new BehaviorSubject<boolean>(false);
  level = 1;
  private childMenuItemClick$ = new Subject<SlSafeAny>();

  setOpenStateWithoutDebounce(value: boolean): void {
    this.isCurrentSubMenuOpen$.next(value);
  }

  // 子菜单项点击事件，供父菜单项订阅
  onChildMenuItemClick(menu: SlSafeAny): void {
    this.childMenuItemClick$.next(menu);
  }

  constructor() {
    if (this.slHostSubmenuService) {
      this.level = this.slHostSubmenuService.level + 1;
    }
  }
}
