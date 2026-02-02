import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const normalizeText = (text: string) => {
  if (!text) return "";
  return text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

export const getColorByData = (data: number | undefined, pivot: number, delta: number) => {
  if (data === undefined || data === null || data === 0) return '#232323ff';

  if (data > pivot + 6 * delta) return '#13004aff';
  if (data > pivot + 5 * delta) return '#130246ff';
  if (data > pivot + 4 * delta) return '#260781ff';
  if (data > pivot + 3 * delta) return '#4b1cd8ff';
  if (data > pivot + 2 * delta) return '#5f2bf9ff';
  if (data > pivot + delta) return '#7143f8ff';
  if (data >= pivot) return '#9175f7ff';
  return '#232323ff';
};
