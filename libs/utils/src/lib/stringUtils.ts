export function isEmpty(str: string) {
  return !str || str.trim().length === 0;
}

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const localeContains = (base: string, sub: string) => {
  if (sub === '') return true;
  if (!sub || !base.length) return false;
  sub = '' + sub;
  if (sub.length > base.length) return false;
  const ascii = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  return ascii(base).includes(ascii(sub));
};

export function randomString(length: number): string {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }
  return randomString;
}
