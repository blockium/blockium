export function isEmpty(str: string) {
  return !str || str.trim().length === 0;
}

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
