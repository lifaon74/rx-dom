import { DEFAULT_DATA_NAME } from '../../../reactive-html/constants/default-data-name.constant';
import {
  generateObjectPropertiesFromLinearProperties, IObjectProperties
} from '../../../reactive-html/compiler/to-lines/helpers/generate-object-properties-lines';
import { DEFAULT_CONTENT_NAME } from '../../../reactive-html/constants/default-content-name.constant';
import { IComponentTemplateCompileOptions } from '../component-template.type';

export function generateConstantsToImportForComponentTemplateFromObject(
  constantsToImport: object,
  {
    dataName = DEFAULT_DATA_NAME,
    contentName = DEFAULT_CONTENT_NAME,
  }: IComponentTemplateCompileOptions = {},
): IObjectProperties {
  return generateObjectPropertiesFromLinearProperties([
    ...Object.keys(constantsToImport),
    dataName,
    contentName,
  ]);
}
