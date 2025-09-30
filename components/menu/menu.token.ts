import { InjectionToken } from '@angular/core';

import { SlMenuService } from './menu.service';

export const SlMenuServiceLocalToken = new InjectionToken<SlMenuService>('SlMenuServiceLocalToken');
