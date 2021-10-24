const STYLE_ELEMENT_USAGE_COUNT = new WeakMap<HTMLStyleElement, Set<HTMLElement>>();

export function linkStyleElementWithComponent(
  styleElement: HTMLStyleElement,
  component: HTMLElement,
): boolean {
  const components: Set<HTMLElement> | undefined = STYLE_ELEMENT_USAGE_COUNT.get(styleElement);
  if (components === void 0) {
    STYLE_ELEMENT_USAGE_COUNT.set(styleElement, new Set<HTMLElement>([component]));
    return true;
  } else {
    components.add(component);
    return false;
  }
}

export function unlinkStyleElementWithComponent(
  styleElement: HTMLStyleElement,
  component: HTMLElement,
): boolean {
  const components: Set<HTMLElement> | undefined = STYLE_ELEMENT_USAGE_COUNT.get(styleElement);
  if (components === void 0) {
    return false;
  } else {
    components.delete(component);
    if (components.size === 0) {
      STYLE_ELEMENT_USAGE_COUNT.delete(styleElement);
      return true;
    } else {
      return false;
    }
  }
}
