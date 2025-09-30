import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { numberAttribute } from '@angular/core';

export function toBoolean(value: unknown): boolean {
  return coerceBooleanProperty(value);
}

export function toCssPixel(value: number | string): string {
  return coerceCssPixelValue(value);
}

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
  return coerceNumberProperty(value, fallbackValue);
}

export function numberAttributeWithZeroFallback(value: unknown): number {
  return numberAttribute(value, 0);
}
