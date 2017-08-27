import { Component } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

@Component({
  selector: 'phone-list',
  template: '<div>Works</div>'
})
export class PhoneListComponent {}

angular
  .module('mhs.admin')
  .directive(
    'phoneList',
    downgradeComponent({component: PhoneListComponent}) as angular.IDirectiveFactory
  );
