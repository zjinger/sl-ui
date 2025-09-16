export function cloneDeep<T>(obj: T): T {
  // 原始值直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 日期
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  // 正则
  if (obj instanceof RegExp) {
    return new RegExp(obj) as any;
  }

  // 数组
  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as any;
  }

  // Map
  if (obj instanceof Map) {
    const result = new Map();
    obj.forEach((value, key) => {
      result.set(key, cloneDeep(value));
    });
    return result as any;
  }

  // Set
  if (obj instanceof Set) {
    const result = new Set();
    obj.forEach((value) => {
      result.add(cloneDeep(value));
    });
    return result as any;
  }

  // 普通对象
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = cloneDeep((obj as any)[key]);
    }
  }
  return result as T;
}
