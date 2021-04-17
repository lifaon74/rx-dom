const STYLE_ELEMENT_USAGE_COUNT = new WeakMap<HTMLStyleElement, number>();

export function getStyleElementUsageCount(
  styleElement: HTMLStyleElement,
): number {
  const value: number | undefined = STYLE_ELEMENT_USAGE_COUNT.get(styleElement);
  return (value == void 0)
    ? 0
    : value;
}

export function setStyleElementUsageCount(
  styleElement: HTMLStyleElement,
  value: number
): void {
  STYLE_ELEMENT_USAGE_COUNT.set(styleElement, value);
}

export function incrementStyleElementUsageCount(
  styleElement: HTMLStyleElement,
): number {
  const value: number = getStyleElementUsageCount(styleElement) + 1;
  setStyleElementUsageCount(styleElement, value);
  return value;
}

export function decrementStyleElementUsageCount(
  styleElement: HTMLStyleElement,
): number {
  const value: number = Math.max(getStyleElementUsageCount(styleElement) - 1, 0);
  setStyleElementUsageCount(styleElement, value);
  return value;
}
