export class DowngradeEntity {}

import { Component, ViewEncapsulation } from '@angular/core';

declare let Reflect: any;
const _reflect: any = Reflect;

export function Downgrade() {
  return function (cls: any) {
    const annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new DowngradeEntity());
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  };
}

export function Console(target) {
  console.log('Our decorated class', target);
}

export class DecoratorUtils {
  public static getMetadata(metadata: any = {}) {
    metadata.encapsulation = ViewEncapsulation.None;
    return metadata;
  }

  public static annotateComponent(cls: any, metadata: any = {}) {
    const annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new Component(DecoratorUtils.getMetadata(metadata)));
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  }
}
