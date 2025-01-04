export function slugify(text: string): string {
  return text
    .normalize('NFD') // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
}
