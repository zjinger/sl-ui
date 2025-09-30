import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectorRef,
  ContentChildren,
  DestroyRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { SlMenuServiceLocalToken } from './menu.token';
import { SlMenuService } from './menu.service';
import { SlMenuThemeType } from './menu.types';
import { SlMenuItemComponent } from './menu-item.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SlSubmenuComponent } from './submenu.component';

@Directive({
  selector: '[sl-menu]',
  exportAs: 'slMenu',
  providers: [
    {
      provide: SlMenuServiceLocalToken,
      useClass: SlMenuService
    }
  ],
  host: {
    class: 'sl-menu',
    '[class.sl-menu-light]': `slTheme === 'light'`,
    '[class.sl-menu-dark]': `slTheme === 'dark'`
  }
})
export class SlMenuDirective implements AfterContentInit, OnInit, OnChanges {
  private readonly slMenuService = inject(SlMenuService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  listOfNzMenuItemDirective!: QueryList<SlMenuItemComponent>;
  private listOfOpenedNzSubMenuComponent: SlSubmenuComponent[] = [];
  @ContentChildren(SlSubmenuComponent, { descendants: true })
  listOfNzSubMenuComponent!: QueryList<SlSubmenuComponent>;

  @Input() slInlineIndent = 24;
  @Input({ transform: booleanAttribute }) slInlineCollapsed = false;
  @Input() slTheme: SlMenuThemeType = 'light';

  @Output() readonly slClick = new EventEmitter<SlMenuItemComponent>();

  private inlineCollapsed$ = new BehaviorSubject<boolean>(this.slInlineCollapsed);

  constructor() {}

  ngOnInit(): void {
    this.slMenuService.descendantMenuItemClick$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(menu => {
      this.slClick.emit(menu);
      this.listOfNzMenuItemDirective.forEach(item => item.setSelectedState(item === menu));
    });
  }

  ngAfterContentInit(): void {
    this.inlineCollapsed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateInlineCollapse();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { slInlineCollapsed, slInlineIndent, slTheme } = changes;
    if (slInlineCollapsed) {
      this.inlineCollapsed$.next(this.slInlineCollapsed);
    }
    if (slInlineIndent) {
      this.slMenuService.setInlineIndent(this.slInlineIndent);
    }
    if (slTheme) {
      this.slMenuService.setTheme(this.slTheme);
    }
  }

  setInlineCollapsed(inlineCollapsed: boolean): void {
    this.slInlineCollapsed = inlineCollapsed;
    this.inlineCollapsed$.next(inlineCollapsed);
  }

  updateInlineCollapse(): void {
    if (this.listOfNzMenuItemDirective) {
      if (this.slInlineCollapsed) {
        this.listOfOpenedNzSubMenuComponent = this.listOfNzSubMenuComponent.filter(submenu => submenu.slOpen);
        this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
      } else {
        this.listOfOpenedNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(true));
        this.listOfOpenedNzSubMenuComponent = [];
      }
    }
  }
}
