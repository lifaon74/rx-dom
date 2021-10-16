import { DEFAULT_DATA_NAME } from '../../../transpilers/constants/default-data-name.constant';
import {
  generateObjectPropertiesFromLinearProperties, IObjectProperties
} from '../../../transpilers/helpers/generate-object-properties-lines';
import { DEFAULT_CONTENT_NAME } from '../../../transpilers/constants/default-content-name.constant';
import {
  IComponentTemplateCompileOptions, IGetNodeReferenceFunction, IGetTemplateReferenceFunction, ISetNodeReferenceFunction,
  ISetTemplateReferenceFunction
} from '../component-template.type';

export function generateConstantsToImportForComponentTemplateFromObject(
  constantsToImport: object,
  {
    dataName = DEFAULT_DATA_NAME,
    contentName = DEFAULT_CONTENT_NAME,
  }: IComponentTemplateCompileOptions = {},
): IObjectProperties {
  return generateObjectPropertiesFromLinearProperties([
    ...Object.keys(constantsToImport),
    'getNodeReference',
    'setNodeReference',
    'getTemplateReference',
    'setTemplateReference',
    dataName,
    contentName,
  ]);
}
