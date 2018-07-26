import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RavenModule } from './raven.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(RavenModule);

