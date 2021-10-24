export function objectDefineProperty<GObject>(
  obj: GObject,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor,
) {
  return Object.defineProperty<GObject>(obj, propertyKey, attributes);
}
