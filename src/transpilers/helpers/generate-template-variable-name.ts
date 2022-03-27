export function generateTemplateVariableName(
  templateName: string,
): string {
  return `template_${templateName}`;
}

const NULL_TEMPLATE: string = 'null';

export function generateOptionalTemplateVariableName(
  templateName: string | undefined,
): string {
  return (templateName === void 0)
    ? NULL_TEMPLATE
    : generateTemplateVariableName(templateName);
}

