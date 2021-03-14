import { DEFAULT_DATA_NAME } from '../../../reactive-html/constants/default-data-name.constant';
import {
  generateObjectPropertiesFromLinearProperties, IObjectProperties
} from '../../../reactive-html/compiler/to-lines/helpers/generate-object-properties-lines';

export function generateConstantsToImportForComponentTemplateFromObject(
  constantsToImport: object,
  dataName: string = DEFAULT_DATA_NAME,
): IObjectProperties {
  return generateObjectPropertiesFromLinearProperties([
    ...Object.keys(constantsToImport),
    dataName,
  ]);
}
