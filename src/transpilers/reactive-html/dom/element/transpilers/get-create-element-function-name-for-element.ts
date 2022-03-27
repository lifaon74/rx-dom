import { getTagName } from '../../../../../light-dom/node/properties/get-tag-name';
import { getNamespaceURI } from '../../../../../light-dom/node/properties/namespace-uri/get-namespace-uri';
import { HTML_NAMESPACE_URI_CONSTANT } from '../../../../../light-dom/node/properties/namespace-uri/html-namespace-uri.constant';
import { MATH_MAL_NAMESPACE_URI_CONSTANT } from '../../../../../light-dom/node/properties/namespace-uri/math-ml-namespace-uri.constant';
import { SVG_NAMESPACE_URI_CONSTANT } from '../../../../../light-dom/node/properties/namespace-uri/svg-namespace-uri.constant';
import { isCustomElementTagName } from '../../../../../light-dom/node/type/tag/is-custom-element-tag-name';
import { IRequireExternalFunctionCreateElementKey } from '../../../require-external/require-external-function-all-key.type';
import { REQUIRE_CREATE_CUSTOM_ELEMENT_CONSTANT } from '../../../require-external/types/require-create-custom-element.type';
import { REQUIRE_CREATE_ELEMENT_CONSTANT } from '../../../require-external/types/require-create-element.type';
import { REQUIRE_CREATE_MATH_ML_ELEMENT_CONSTANT } from '../../../require-external/types/require-create-math-ml-element.type';
import { REQUIRE_CREATE_SVG_ELEMENT_CONSTANT } from '../../../require-external/types/require-create-svg-element.type';

export function getCreateElementFunctionNameForElement(
  node: Element,
): IRequireExternalFunctionCreateElementKey {
  const namespaceURI: string = getNamespaceURI(node);
  switch (namespaceURI) {
    case HTML_NAMESPACE_URI_CONSTANT:
      return (isCustomElementTagName(getTagName(node)))
        ? REQUIRE_CREATE_CUSTOM_ELEMENT_CONSTANT
        : REQUIRE_CREATE_ELEMENT_CONSTANT;
    case SVG_NAMESPACE_URI_CONSTANT:
      return REQUIRE_CREATE_SVG_ELEMENT_CONSTANT;
    case MATH_MAL_NAMESPACE_URI_CONSTANT:
      return REQUIRE_CREATE_MATH_ML_ELEMENT_CONSTANT;
    default:
      throw new Error(`Unsupported namespaceURI: ${namespaceURI}`);
  }
}
