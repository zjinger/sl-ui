import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SlMenuThemeType } from './menu.types';
import { SlSafeAny } from 'ngx-sl-ui/core/types';
@Injectable()
export class SlMenuService {
  // 子菜单项点击事件，供父菜单项订阅
  descendantMenuItemClick$ = new Subject<SlSafeAny>();
  inlineIndent$ = new BehaviorSubject<number>(24);
  theme$ = new BehaviorSubject<SlMenuThemeType>('light');

  onDescendantMenuItemClick(menu: SlSafeAny): void {
    this.descendantMenuItemClick$.next(menu);
  }

  setInlineIndent(indent: number): void {
    this.inlineIndent$.next(indent);
  }

  setTheme(theme: SlMenuThemeType): void {
    this.theme$.next(theme);
  }
}
