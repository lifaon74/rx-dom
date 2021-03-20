import { IGenericFunction } from '@lifaon/rx-js-light';
import { endPatching, isPatching, startPatching } from './is-patching';

type IMethodNameConstraintRaw<GObject extends object> = {
  [GKey in keyof GObject]: GObject[GKey] extends IGenericFunction
    ? GKey
    : never;
}

export type IMethodNameConstraint<GObject extends object> =
  IMethodNameConstraintRaw<GObject>[keyof IMethodNameConstraintRaw<GObject>];

export function patchObjectMethod<// generics
  GObject extends object,
  GMethodName extends IMethodNameConstraint<GObject>
  //
  >(
  obj: GObject,
  methodName: GMethodName,
  newFunction: GObject[GMethodName],
): void {
  const native: GObject[GMethodName] = obj[methodName];

  const patched = function (this: unknown, ...args: unknown[]): unknown {
    if (isPatching()) {
      return (native as IGenericFunction).apply(this, args);
    } else {
      startPatching();
      const result: unknown = (newFunction as IGenericFunction).apply(this, args);
      endPatching();
      return result;
    }
  };

  Object.defineProperty(patched, 'name', {
    ...Object.getOwnPropertyDescriptor(patched, 'name'),
    value: methodName,
  });
  patched.toString = (native as IGenericFunction).toString.bind(native);

  obj[methodName] = patched as GObject[GMethodName];
}
