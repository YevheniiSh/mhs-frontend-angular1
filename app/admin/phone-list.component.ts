import { Component } from "@angular/core";
import { Phone, PhoneData } from "./phone.service";
import { downgradeComponent } from "@angular/upgrade/static";

@Component({
    selector: 'phone-list',
    template: '<div>Works</div>'
})
export class PhoneListComponent {
    phones: PhoneData[];
    query: string;
    orderProp: string;

    constructor(phone: Phone) {
        phone.query().subscribe(phones => {
            this.phones = phones;
        });
        this.orderProp = 'age';
    }

    getPhones(): PhoneData[] {
        return this.sortPhones(this.filterPhones(this.phones));
    }

    private filterPhones(phones: PhoneData[]) {
        if (phones && this.query) {
            return phones.filter(phone => {
                let name = phone.name.toLowerCase();
                let snippet = phone.snippet.toLowerCase();
                return name.indexOf(this.query) >= 0 || snippet.indexOf(this.query) >= 0;
            });
        }
        return phones;
    }

    private sortPhones(phones: PhoneData[]) {
        if (phones && this.orderProp) {
            return phones
                .slice(0) // Make a copy
                .sort((a, b) => {
                    if (a[this.orderProp] < b[this.orderProp]) {
                        return -1;
                    } else if ([b[this.orderProp] < a[this.orderProp]]) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
        }
        return phones;
    }

}

angular
    .module('mhs.admin')
    .directive(
        'phoneList',
        downgradeComponent({component: PhoneListComponent}) as angular.IDirectiveFactory
    );