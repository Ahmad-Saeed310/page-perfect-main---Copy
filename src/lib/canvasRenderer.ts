import { PaperSize, mmToPixels, Orientation, getEffectiveDimensions } from './paperSizes';
import { TemplateConfig } from './templateConfigs';
import { TextElement, CanvasImageData } from './canvasTypes';
import { renderSpecialtyTemplate } from './templateRenderers';

export interface RenderOptions {
  paperSize: PaperSize;
  config: TemplateConfig;
  templateId: string;
  scale: number;
  notepadText?: string;
  orientation?: Orientation;
}

export function renderWatermark(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  scale: number
): void {
  const fontSize = Math.max(10, 12 * scale);
  ctx.font = `${fontSize}px 'Inter', system-ui, sans-serif`;
  ctx.fillStyle = 'rgba(150, 150, 150, 0.3)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  
  // Add blur effect
  ctx.filter = 'blur(0.5px)';
  ctx.fillText('allprintablepages.com', canvas.width / 2, canvas.height - 10 * scale);
  ctx.filter = 'none';
  ctx.textAlign = 'left';
}

export function renderTemplate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  options: RenderOptions
): void {
  const { config, templateId, scale, notepadText } = options;
  
  ctx.fillStyle = config.pageColor || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  
  const contentHeight = canvas.height - marginTop - marginBottom;
  
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  
  // Try specialty renderer first
  const handled = renderSpecialtyTemplate(ctx, canvas, templateId, config, scale);
  
  if (!handled) {
    switch (templateId) {
      case 'blank':
      case 'thoroughly-blank':
        break;
        
      case 'working-sheet':
      case 'sketch-pad':
        drawGrid(ctx, canvas, config, scale, 0.3);
        break;
        
      case 'school-copy':
      case 'wide-ruled':
      case 'narrow-ruled':
      case 'note-paper':
        drawLines(ctx, canvas, config, scale);
        if (config.showMarginLine) {
          drawMarginLine(ctx, marginLeft, marginTop, contentHeight, config.marginLineColor);
        }
        break;
        
      case 'lined':
      case 'penmanship':
      case 'outline':
        drawLines(ctx, canvas, config, scale);
        break;
        
      case 'graph':
      case 'fine-grid':
      case 'large-grid':
        drawGrid(ctx, canvas, config, scale, 1);
        break;
        
      case 'dot-grid':
      case 'dots-boxes':
      case 'target-dots':
        drawDotGrid(ctx, canvas, config, scale);
        break;
        
      case 'music-sheet':
        drawMusicStaff(ctx, canvas, config, scale);
        break;
        
      case 'engineering':
        drawGrid(ctx, canvas, config, scale, 0.6);
        if (config.showMarginLine) {
          drawMarginLine(ctx, marginLeft, marginTop, contentHeight, config.marginLineColor);
        }
        break;
        
      case 'cornell-notes':
        drawCornellNotes(ctx, canvas, config, scale);
        break;
        
      case 'planner':
        drawPlanner(ctx, canvas, config, scale);
        break;
        
      case 'calligraphy':
        drawCalligraphy(ctx, canvas, config, scale);
        break;
        
      case 'isometric':
        drawIsometric(ctx, canvas, config, scale);
        break;
        
      case 'hexagon':
        drawHexagonGrid(ctx, canvas, config, scale);
        break;
        
      case 'storyboard':
        drawStoryboard(ctx, canvas, config, scale);
        break;
        
      default:
        // Fallback to lined if template has lineSpacing
        if (config.lineSpacing > 0) {
          drawLines(ctx, canvas, config, scale);
        } else if (config.gridSize > 0) {
          drawGrid(ctx, canvas, config, scale, 1);
        }
    }
  }
  
  if (notepadText && notepadText.trim()) {
    renderNotepadText(ctx, canvas, config, scale, notepadText);
  }
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const lineSpacing = scaledMmToPixels(config.lineSpacing);
  
  const startX = marginLeft;
  const endX = canvas.width - marginRight;
  const startY = marginTop;
  const endY = canvas.height - marginBottom;
  
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  
  let y = startY + lineSpacing;
  while (y <= endY) {
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    y += lineSpacing;
  }
  
  ctx.stroke();
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number,
  opacity: number = 1
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const gridSize = scaledMmToPixels(config.gridSize);
  
  const startX = marginLeft;
  const endX = canvas.width - marginRight;
  const startY = marginTop;
  const endY = canvas.height - marginBottom;
  
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  
  let x = startX;
  while (x <= endX) {
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    x += gridSize;
  }
  
  let y = startY;
  while (y <= endY) {
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    y += gridSize;
  }
  
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawDotGrid(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const gridSize = scaledMmToPixels(config.gridSize);
  
  const startX = marginLeft;
  const endX = canvas.width - marginRight;
  const startY = marginTop;
  const endY = canvas.height - marginBottom;
  
  ctx.fillStyle = config.lineColor;
  
  const dotRadius = Math.max(1, scale * 1.2);
  
  let x = startX;
  while (x <= endX) {
    let y = startY;
    while (y <= endY) {
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
      y += gridSize;
    }
    x += gridSize;
  }
}

function drawMusicStaff(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const lineSpacing = scaledMmToPixels(config.lineSpacing);
  
  const startX = marginLeft;
  const endX = canvas.width - marginRight;
  const startY = marginTop;
  const endY = canvas.height - marginBottom;
  
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  
  const staffLineGap = lineSpacing;
  const staffHeight = staffLineGap * 4;
  const staffGap = scaledMmToPixels(15);
  
  let staffY = startY + staffLineGap * 2;
  
  while (staffY + staffHeight <= endY) {
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(startX, staffY + i * staffLineGap);
      ctx.lineTo(endX, staffY + i * staffLineGap);
      ctx.stroke();
    }
    staffY += staffHeight + staffGap;
  }
}

function drawMarginLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  startY: number,
  height: number,
  color: string
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, startY);
  ctx.lineTo(x, startY + height);
  ctx.stroke();
}

function drawCornellNotes(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const lineSpacing = scaledMmToPixels(config.lineSpacing);
  
  const endX = canvas.width - marginRight;
  const endY = canvas.height - marginBottom;
  
  // Draw horizontal lines in notes area
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  
  let y = marginTop + lineSpacing;
  while (y <= endY) {
    ctx.moveTo(marginLeft, y);
    ctx.lineTo(endX, y);
    y += lineSpacing;
  }
  ctx.stroke();
  
  // Draw vertical margin line (cue column)
  ctx.strokeStyle = config.marginLineColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(marginLeft, marginTop);
  ctx.lineTo(marginLeft, endY);
  ctx.stroke();
  
  // Draw summary section line at bottom
  const summaryY = canvas.height - scaledMmToPixels(50);
  ctx.beginPath();
  ctx.moveTo(scaledMmToPixels(15), summaryY);
  ctx.lineTo(endX, summaryY);
  ctx.stroke();
}

function drawPlanner(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const lineSpacing = scaledMmToPixels(config.lineSpacing);
  
  const endX = canvas.width - marginRight;
  const endY = canvas.height - marginBottom;
  
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  
  // Draw time slots
  const hours = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];
  const fontSize = scaledMmToPixels(3);
  ctx.font = `${fontSize}px 'Inter', system-ui, sans-serif`;
  ctx.fillStyle = config.marginLineColor;
  
  let y = marginTop + lineSpacing;
  let hourIndex = 0;
  
  while (y <= endY && hourIndex < hours.length) {
    // Draw line
    ctx.strokeStyle = config.lineColor;
    ctx.beginPath();
    ctx.moveTo(marginLeft, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
    
    // Draw time label
    ctx.fillText(hours[hourIndex], scaledMmToPixels(10), y - scaledMmToPixels(1));
    
    y += lineSpacing;
    hourIndex++;
  }
  
  // Draw margin line
  ctx.strokeStyle = config.marginLineColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(marginLeft, marginTop);
  ctx.lineTo(marginLeft, endY);
  ctx.stroke();
}

function drawCalligraphy(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const lineSpacing = scaledMmToPixels(config.lineSpacing);
  
  const startX = marginLeft;
  const endX = canvas.width - marginRight;
  const endY = canvas.height - marginBottom;
  
  const xHeight = lineSpacing * 0.4; // x-height
  const ascender = lineSpacing * 0.3;
  const descender = lineSpacing * 0.3;
  
  ctx.lineWidth = 1;
  
  let y = marginTop + ascender;
  
  while (y + descender <= endY) {
    // Ascender line (dashed)
    ctx.strokeStyle = config.lineColor;
    ctx.setLineDash([3 * scale, 3 * scale]);
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
    
    // X-height line (solid)
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(startX, y + ascender);
    ctx.lineTo(endX, y + ascender);
    ctx.stroke();
    
    // Baseline (solid, thicker)
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(startX, y + ascender + xHeight);
    ctx.lineTo(endX, y + ascender + xHeight);
    ctx.stroke();
    ctx.lineWidth = 1;
    
    // Descender line (dashed)
    ctx.setLineDash([3 * scale, 3 * scale]);
    ctx.beginPath();
    ctx.moveTo(startX, y + ascender + xHeight + descender);
    ctx.lineTo(endX, y + ascender + xHeight + descender);
    ctx.stroke();
    ctx.setLineDash([]);
    
    y += lineSpacing;
  }
}

function drawIsometric(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const gridSize = scaledMmToPixels(config.gridSize);
  
  const startX = marginLeft;
  const endX = canvas.width - marginRight;
  const startY = marginTop;
  const endY = canvas.height - marginBottom;
  
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.6;
  
  const angle = Math.PI / 6; // 30 degrees
  const verticalSpacing = gridSize;
  const horizontalSpacing = gridSize * Math.cos(angle);
  
  // Draw vertical lines
  for (let x = startX; x <= endX; x += horizontalSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }
  
  // Draw diagonal lines going right
  for (let y = startY - (endX - startX) * Math.tan(angle); y <= endY; y += verticalSpacing) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y + (endX - startX) * Math.tan(angle));
    ctx.stroke();
  }
  
  // Draw diagonal lines going left
  for (let y = startY - (endX - startX) * Math.tan(angle); y <= endY; y += verticalSpacing) {
    ctx.beginPath();
    ctx.moveTo(endX, y);
    ctx.lineTo(startX, y + (endX - startX) * Math.tan(angle));
    ctx.stroke();
  }
  
  ctx.globalAlpha = 1;
}

function drawHexagonGrid(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const size = scaledMmToPixels(config.gridSize);
  
  const endX = canvas.width - marginRight;
  const endY = canvas.height - marginBottom;
  
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  
  const hexWidth = size * 2;
  const hexHeight = size * Math.sqrt(3);
  
  const drawHex = (cx: number, cy: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = cx + size * Math.cos(angle);
      const y = cy + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  };
  
  let row = 0;
  for (let y = marginTop + size; y < endY; y += hexHeight * 0.75) {
    const offset = row % 2 === 0 ? 0 : hexWidth * 0.75;
    for (let x = marginLeft + size + offset; x < endX; x += hexWidth * 1.5) {
      drawHex(x, y);
    }
    row++;
  }
}

function drawStoryboard(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  
  const contentWidth = canvas.width - marginLeft - marginRight;
  const contentHeight = canvas.height - marginTop - marginBottom;
  
  const cols = 2;
  const rows = 3;
  const gapX = scaledMmToPixels(10);
  const gapY = scaledMmToPixels(15);
  const frameWidth = (contentWidth - gapX * (cols - 1)) / cols;
  const frameHeight = (contentHeight - gapY * (rows - 1)) / rows * 0.7;
  
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 2;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = marginLeft + col * (frameWidth + gapX);
      const y = marginTop + row * ((contentHeight) / rows);
      
      // Draw frame
      ctx.strokeRect(x, y, frameWidth, frameHeight);
      
      // Draw lines below for notes
      ctx.lineWidth = 0.5;
      const lineY1 = y + frameHeight + scaledMmToPixels(5);
      const lineY2 = y + frameHeight + scaledMmToPixels(10);
      ctx.beginPath();
      ctx.moveTo(x, lineY1);
      ctx.lineTo(x + frameWidth, lineY1);
      ctx.moveTo(x, lineY2);
      ctx.lineTo(x + frameWidth, lineY2);
      ctx.stroke();
      ctx.lineWidth = 2;
    }
  }
}

function renderNotepadText(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  scale: number,
  text: string
): void {
  const scaledMmToPixels = (mm: number) => mmToPixels(mm) * scale;
  
  const marginTop = scaledMmToPixels(config.marginTop);
  const marginLeft = scaledMmToPixels(config.marginLeft);
  const marginRight = scaledMmToPixels(config.marginRight);
  const marginBottom = scaledMmToPixels(config.marginBottom);
  
  let lineHeight: number;
  if (config.lineSpacing > 0) {
    lineHeight = scaledMmToPixels(config.lineSpacing);
  } else if (config.gridSize > 0) {
    lineHeight = scaledMmToPixels(config.gridSize * 2);
  } else {
    lineHeight = scaledMmToPixels(7);
  }
  
  const contentWidth = canvas.width - marginLeft - marginRight;
  
  const fontSize = lineHeight * 0.65;
  ctx.font = `${fontSize}px 'Inter', system-ui, sans-serif`;
  ctx.fillStyle = '#1a1a1a';
  ctx.textBaseline = 'alphabetic';
  
  const lines = wrapText(ctx, text, contentWidth);
  let y = marginTop + lineHeight;
  
  const maxY = canvas.height - marginBottom;
  
  for (const line of lines) {
    if (y > maxY) break;
    ctx.fillText(line, marginLeft, y - (lineHeight * 0.2));
    y += lineHeight;
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');
  
  for (const paragraph of paragraphs) {
    if (paragraph === '') {
      lines.push('');
      continue;
    }
    
    const words = paragraph.split(' ');
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
  }
  
  return lines;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function renderForExport(
  paperSize: PaperSize,
  templateId: string,
  config: TemplateConfig,
  dpi: number = 300,
  notepadText?: string,
  textElements?: TextElement[],
  images?: CanvasImageData[],
  orientation: Orientation = 'portrait'
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const dims = getEffectiveDimensions(paperSize, orientation);
  const fullWidth = (dims.width / 25.4) * dpi;
  const fullHeight = (dims.height / 25.4) * dpi;
  
  canvas.width = fullWidth;
  canvas.height = fullHeight;
  
  const ctx = canvas.getContext('2d')!;
  const scale = dpi / 96;
  
  renderTemplate(ctx, canvas, {
    paperSize,
    config,
    templateId,
    scale,
    notepadText,
    orientation,
  });
  
  if (images && images.length > 0) {
    const exportScale = fullWidth / ((dims.width / 25.4) * 96);
    
    for (const img of images) {
      try {
        const imgEl = await loadImage(img.src);
        ctx.drawImage(
          imgEl,
          img.x * exportScale,
          img.y * exportScale,
          img.width * exportScale,
          img.height * exportScale
        );
      } catch (e) {
        console.error('Failed to load image for export:', e);
      }
    }
  }
  
  if (textElements && textElements.length > 0) {
    const exportScale = fullWidth / ((dims.width / 25.4) * 96);
    
    for (const el of textElements) {
      const fontStyle = `${el.italic ? 'italic ' : ''}${el.bold ? 'bold ' : ''}`;
      ctx.font = `${fontStyle}${el.fontSize * exportScale}px 'Inter', system-ui, sans-serif`;
      ctx.fillStyle = el.color || '#1a1a1a';
      ctx.textBaseline = 'top';
      ctx.fillText(el.text, el.x * exportScale, el.y * exportScale);
    }
  }
  
  // Render watermark on export
  renderWatermark(ctx, canvas, scale);
  
  return canvas;
}
