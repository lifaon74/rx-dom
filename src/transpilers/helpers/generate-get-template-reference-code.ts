export function generateGetTemplateReferenceCode(
  referenceName: string,
): string {
  return `getTemplateReference(${JSON.stringify(referenceName)})`;
}

const NULL_TEMPLATE: string = 'null';

export function generateGetOptionalTemplateReferenceCode(
  referenceName: string | undefined,
): string {
  return (referenceName === void 0)
    ? NULL_TEMPLATE
    : generateGetTemplateReferenceCode(referenceName);
}
