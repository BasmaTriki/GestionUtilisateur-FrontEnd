"use strict";
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const raven_module_1 = require("./raven.module");
const environment_1 = require("./environments/environment");
const core_1 = require("@angular/core");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(raven_module_1.RavenModule);
//# sourceMappingURL=raven.js.map