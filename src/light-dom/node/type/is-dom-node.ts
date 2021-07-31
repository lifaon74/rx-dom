
export function isDOMNode(
  value: unknown,
): value is Node {
  return (value instanceof Node);
}

