import { createSimpleIteratorCompiler, ISimpleIteratorCompiler } from '../../helpers/create-simple-iterator-compiler';
import { compileModifierAttribute } from './compilers';
import { compileBindPropertyFromAttr } from './compilers/bind/compile-bind-property';
import { compileStaticAttribute } from './compilers/compile-static-attribute';
import { compileEventPropertyFromAttr } from './compilers/event/compile-event-property';
import { compileReferencePropertyFromAttr } from './compilers/reference/compile-reference-property';

export interface IAttributeCompiler extends ISimpleIteratorCompiler<Attr> {
}

export const DEFAULT_ATTRIBUTE_COMPILERS: IAttributeCompiler[] = [
  compileReferencePropertyFromAttr,
  compileBindPropertyFromAttr,
  compileEventPropertyFromAttr,
  compileModifierAttribute,
  compileStaticAttribute,
];

export const compileAttribute = createSimpleIteratorCompiler<Attr>(DEFAULT_ATTRIBUTE_COMPILERS);

