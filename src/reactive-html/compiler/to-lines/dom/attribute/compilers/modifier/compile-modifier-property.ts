import {
  createSimpleIteratorCompiler, ISimpleIteratorCompiler, wrapSimpleIteratorCompilerWithExtractor
} from '../../../../helpers/create-simple-iterator-compiler';
import { extractModifierProperty, IModifierProperty } from './extract-modifier-property';
import { compileDefaultModifierProperty } from './compilers/compile-default-modifier-property';

export interface IModifierPropertyCompiler extends ISimpleIteratorCompiler<IModifierProperty> {
}

export const DEFAULT_MODIFIER_PROPERTY_COMPILERS: IModifierPropertyCompiler[] = [
  compileDefaultModifierProperty,
];

export const compileModifierProperty = createSimpleIteratorCompiler<IModifierProperty>(DEFAULT_MODIFIER_PROPERTY_COMPILERS);

export const compileModifierPropertyFromAttr = wrapSimpleIteratorCompilerWithExtractor<Attr, IModifierProperty>(compileModifierProperty, extractModifierProperty);

