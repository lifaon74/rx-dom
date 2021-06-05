import { IComponentTemplate } from '../component-template.type';

let COMPONENT_TEMPLATE_AOT_ENABLED: boolean = false;

export function enableComponentTemplateAOT(): void {
  COMPONENT_TEMPLATE_AOT_ENABLED = true;
}

export function isComponentTemplateAOTEnabled(): boolean {
  return COMPONENT_TEMPLATE_AOT_ENABLED;
}


/*------------------*/

const COMPONENT_TEMPLATE_AOT_MAP = new Map<IComponentTemplate<any>, string>();

export function registerComponentTemplateForAOT<GComponentTemplate extends IComponentTemplate<any>>(
  componentTemplate: GComponentTemplate,
  code: string,
): GComponentTemplate {
  if (COMPONENT_TEMPLATE_AOT_ENABLED) {
    if (COMPONENT_TEMPLATE_AOT_MAP.has(componentTemplate)) {
      throw new Error(`Component template already registered`);
    } else {
      COMPONENT_TEMPLATE_AOT_MAP.set(componentTemplate, code);
    }
  }
  return componentTemplate;
}

export function getComponentTemplateForAOT(
  componentTemplate: IComponentTemplate<any>,
): string | undefined {
  return COMPONENT_TEMPLATE_AOT_MAP.get(componentTemplate);
}
