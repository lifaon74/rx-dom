import { ILines } from '../../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForRXSwitchDefault(
  switchDefaultName: string,
  template: string,
): ILines {
  return [
    `// switch default`,
    `${switchDefaultName} = ${template};`,
  ];
}
