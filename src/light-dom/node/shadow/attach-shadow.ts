
export const DEFAULT_ATTACH_SHADOW_INIT: ShadowRootInit = {
  mode: 'open',
};

export function attachShadow(
  node: Element,
  init: ShadowRootInit = DEFAULT_ATTACH_SHADOW_INIT,
): ShadowRoot {
  return node.attachShadow(init);
}


