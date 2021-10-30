import { ILines, ILinesOrNull } from '../types/lines.type';

export function indentLines(
  lines: ILines,
  indent: string = '  ',
): ILines {
  return lines.map((line: string) => (indent + line));
}

export function scopeLines(
  lines: ILines,
): ILines {
  return [
    '{',
    ...indentLines(lines),
    '}',
  ];
}

export function linesToString(
  lines: ILines,
): string {
  return lines.join('\n');
}

export function nullIfEmptyLines(
  lines: ILines,
): ILinesOrNull {
  return (lines.length === 0)
    ? null
    : lines;
}

export function optionalLines(
  lines: ILinesOrNull,
): ILines {
  return (lines === null)
    ? []
    : lines;
}

export function stringToLines(
  input: string,
): ILines {
  const lines: ILines = stringToLinesRaw(input);

  let indent: string = '';

  // 1) remove empty lines (front start) and find indent
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') {
      lines.splice(i, 1);
      i--;
    } else {
      const match: RegExpMatchArray = (/^([\t ]*)/).exec(lines[i]) as RegExpMatchArray;
      indent = match[1];
      break;
    }
  }

  // 2) remove empty lines (front end)
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '') {
      lines.splice(i, 1);
    } else {
      break;
    }
  }

  // 3) remove indent
  if (indent !== '') {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith(indent)) {
        lines[i] = lines[i].slice(indent.length);
      } else {
        console.warn(`Invalid indent for: ${JSON.stringify(lines[i])}`);
      }
    }
  }

  return lines;
}

export function stringToLinesRaw(
  input: string,
): ILines {
  return input.split(/\r?\n/);
}





