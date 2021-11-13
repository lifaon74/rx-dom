import { scopeLines } from '../../../../../helpers/lines-formatting-helpers';
import { ILines } from '../../../../../types/lines.type';
import { SWITCH_DEFAULT_NAME } from './switch-default-name.constant';
import { SWITCH_MAP_NAME } from './switch-map-name.constant';

export function generateReactiveDOMJSLinesForRXSwitch(
  expression: string,
  childLines: ILines,
  switchMapName: string = SWITCH_MAP_NAME,
  switchDefaultName: string = SWITCH_DEFAULT_NAME,
): ILines {
  return scopeLines([
    `// reactive switch`,
    `const ${switchMapName} = new Map();`,  // INFO let and const are important, because they SCOPE and fix the variables
    `let ${switchDefaultName} = null;`,
    ...childLines,
    `nodeAppendChild(parentNode, createReactiveSwitchNode(toObservable(${expression}), ${switchMapName}, ${switchDefaultName}));`,
  ]);
}
