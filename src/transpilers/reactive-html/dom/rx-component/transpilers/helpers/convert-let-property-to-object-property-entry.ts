import { dashCaseToCamelCase } from '../../../../../../misc/case-converters/dash-case';
import { generateObjectPropertyEntry, IObjectPropertyEntry } from '../../../../../helpers/generate-object-properties-lines';
import { ILetProperty } from './extract-let-property-from-reactive-html-attribute';

export function convertLetPropertyToObjectPropertyEntry(
  letProperty: ILetProperty,
): IObjectPropertyEntry {
  return generateObjectPropertyEntry(dashCaseToCamelCase(letProperty.name), letProperty.value);
}
