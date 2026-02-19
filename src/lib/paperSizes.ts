// Paper sizes in millimeters (width x height)
export interface PaperSize {
  id: string;
  name: string;
  width: number; // mm
  height: number; // mm
  category: 'iso' | 'us';
}

export type Orientation = 'portrait' | 'landscape';

export const PAPER_SIZES: PaperSize[] = [
  // ISO A Series
  { id: 'a0', name: 'A0', width: 841, height: 1189, category: 'iso' },
  { id: 'a1', name: 'A1', width: 594, height: 841, category: 'iso' },
  { id: 'a2', name: 'A2', width: 420, height: 594, category: 'iso' },
  { id: 'a3', name: 'A3', width: 297, height: 420, category: 'iso' },
  { id: 'a4', name: 'A4', width: 210, height: 297, category: 'iso' },
  { id: 'a5', name: 'A5', width: 148, height: 210, category: 'iso' },
  // US Sizes
  { id: 'letter', name: 'Letter', width: 216, height: 279, category: 'us' },
  { id: 'legal', name: 'Legal', width: 216, height: 356, category: 'us' },
  { id: 'ledger', name: 'Ledger', width: 279, height: 432, category: 'us' },
];

export const DPI = 96; // Screen DPI for preview
export const PRINT_DPI = 300; // Print quality DPI

// Convert mm to pixels at given DPI
export function mmToPixels(mm: number, dpi: number = DPI): number {
  return Math.round((mm / 25.4) * dpi);
}

// Convert pixels to mm at given DPI
export function pixelsToMm(pixels: number, dpi: number = DPI): number {
  return (pixels * 25.4) / dpi;
}

// Get effective dimensions based on orientation
export function getEffectiveDimensions(
  paperSize: PaperSize,
  orientation: Orientation
): { width: number; height: number } {
  if (orientation === 'landscape') {
    return { width: paperSize.height, height: paperSize.width };
  }
  return { width: paperSize.width, height: paperSize.height };
}

// Get canvas dimensions for a paper size (scaled for preview)
export function getCanvasDimensions(
  paperSize: PaperSize,
  orientation: Orientation = 'portrait',
  maxWidth: number = 600,
  maxHeight: number = 800
): { width: number; height: number; scale: number } {
  const dims = getEffectiveDimensions(paperSize, orientation);
  const fullWidth = mmToPixels(dims.width);
  const fullHeight = mmToPixels(dims.height);
  
  const scaleX = maxWidth / fullWidth;
  const scaleY = maxHeight / fullHeight;
  const scale = Math.min(scaleX, scaleY, 1);
  
  return {
    width: Math.round(fullWidth * scale),
    height: Math.round(fullHeight * scale),
    scale,
  };
}

// Get PDF dimensions in points (72 DPI)
export function getPdfDimensions(
  paperSize: PaperSize,
  orientation: Orientation = 'portrait'
): { width: number; height: number } {
  const dims = getEffectiveDimensions(paperSize, orientation);
  return {
    width: (dims.width / 25.4) * 72,
    height: (dims.height / 25.4) * 72,
  };
}
