import { ILines } from '../../../../../../types/lines.type';

export function generateReactiveDOMJSLinesForRXSwitchCase(
  switchMapName: string,
  caseValue: string,
  template: string,
): ILines {
  return [
    `// switch case`,
    `${switchMapName}.set(${caseValue}, ${template});`,
  ];
}
