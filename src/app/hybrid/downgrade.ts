declare let Reflect: any;
const _reflect: any = Reflect;

export class DowngradeEntity {
  constructor(private _module?: string) {
  }

  get module(): string {
    return this._module;
  }
}

export function Downgrade(module?: string) {
  return function (cls: any) {
    const annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new DowngradeEntity(module));
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  };
}
