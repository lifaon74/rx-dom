/**
 * Searches and returns a case insensitive property of an object
 */
export function searchCaseInsensitiveProperty(
  name: string,
  object: any,
): string | null {
  if (name in object) {
    return name;
  } else {
    const lowerCaseName: string = name.toLowerCase();
    for (const prop in object) {
      if (prop.toLowerCase() === lowerCaseName) {
        return prop;
      }
    }
    return null;
  }
}
