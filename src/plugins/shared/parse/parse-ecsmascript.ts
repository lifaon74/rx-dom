import { Comment, Node, parse } from 'acorn';

export function parseEcmaScript(
  code: string,
): Node {
  try {
    return parse(code, { ecmaVersion: 'latest', sourceType: 'module', });
  } catch {
    return parse(code, { ecmaVersion: 'latest', sourceType: 'script' });
  }
}
