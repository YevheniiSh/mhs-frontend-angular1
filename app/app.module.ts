import { UpgradeModule } from '@angular/upgrade/static/';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { AdminModule } from "./admin/admin.module";
import { routeParamsProvider } from "./ajs-upgraded-providers";

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule,
        FormsModule,
        HttpModule,
        AdminModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [
        routeParamsProvider
    ],
})
export class AppModule {
    constructor(private upgrade: UpgradeModule) {
    }

    ngDoBootstrap() {
        this.upgrade.bootstrap(document.documentElement, ['mhs']);
    }
}
