// gateway/src/utils/helpers.ts

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function omit<T extends object>(obj: T, keys: string[]): Partial<T> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key as keyof T]);
  return result;
}

export function pick<T extends object>(obj: T, keys: string[]): Partial<T> {
  const result: any = {};
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key as keyof T];
    }
  });
  return result;
}