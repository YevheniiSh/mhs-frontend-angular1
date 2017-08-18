'use strict';
import { NgModule } from "@angular/core";
import { PhoneListComponent } from "./phone-list.component";
import { Phone } from "./phone.service";


@NgModule({
    declarations: [
        PhoneListComponent,
    ],
    entryComponents: [
        PhoneListComponent,
    ],
    providers: [
        Phone,
    ],
})
export class AdminModule {
}

angular
    .module('mhs.admin')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider: angular.ILocationProvider,
                        $routeProvider: angular.route.IRouteProvider) {
            $routeProvider
                .when('/phones', {
                    template: '<phone-list></phone-list>'
                })
        }]
    );