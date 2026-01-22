import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyPreset } from './share/mypreset';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(),
    // provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: MyPreset,
                options: {
                    darkModeSelector: false || 'none'
                }
            }
    })
  ]
};
