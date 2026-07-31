import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import 'zone.js';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/error-interceptor';
import { loadingInterceptor } from './core/loading-interceptor';
import { Init } from './core/init';
import { lastValueFrom } from 'rxjs';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { authInterceptor } from './core/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor,authInterceptor])),
    provideAppInitializer(async () => {
      const iniservice = inject(Init)
      return lastValueFrom(iniservice.inint()).finally(() => {
        const splash = document.getElementById('initial-splash')
        if (splash) {
          splash.remove()
        }
      })
    }),
    // {
    //   provide: MAT_DIALOG_DEFAULT_OPTIONS,
    //   useValue: { autoFocus: 'dialog', restoreFocus: true }
    // }
  ]
};
