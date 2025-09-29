import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SlMenuThemeType } from './menu.types';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  theme$ = new BehaviorSubject<SlMenuThemeType>('light');

  setTheme(theme: SlMenuThemeType): void {
    this.theme$.next(theme);
  }
}
