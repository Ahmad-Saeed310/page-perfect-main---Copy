import { mmToPixels } from './paperSizes';
import { TemplateConfig } from './templateConfigs';

type Ctx = CanvasRenderingContext2D;

export function renderSpecialtyTemplate(
  ctx: Ctx,
  canvas: HTMLCanvasElement,
  templateId: string,
  config: TemplateConfig,
  scale: number
): boolean {
  const scaledMm = (mm: number) => mmToPixels(mm) * scale;
  const mt = scaledMm(config.marginTop);
  const mb = scaledMm(config.marginBottom);
  const ml = scaledMm(config.marginLeft);
  const mr = scaledMm(config.marginRight);
  const w = canvas.width;
  const h = canvas.height;

  switch (templateId) {
    case 'polar':
      drawPolarGraph(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'logarithmic':
    case 'log-log':
      drawLogLog(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'semi-log':
      drawSemiLog(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'octagon':
      drawOctagonGrid(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'pentagon':
      drawPentagonGrid(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'triangle':
      drawTriangleGrid(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'perspective-1pt':
      draw1PointPerspective(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'perspective-2pt':
      draw2PointPerspective(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'cartesian':
    case 'quadrant':
      drawCartesian(ctx, w, h, ml, mr, mt, mb, config, scale, templateId === 'quadrant');
      return true;
    case 'guitar-tab':
      drawGuitarTab(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'piano-staff':
      drawPianoStaff(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'comic-strip':
      drawComicStrip(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'flashcard':
      drawFlashcards(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'columnar-2':
    case 'columnar-3':
    case 'columnar-pad':
      drawColumnar(ctx, w, h, ml, mr, mt, mb, config, scale, templateId === 'columnar-3' ? 3 : templateId === 'columnar-pad' ? 6 : 2);
      return true;
    case 'weekly-planner':
      drawWeeklyPlanner(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'monthly-planner':
    case 'calendar-monthly':
      drawMonthlyCalendar(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'habit-tracker':
      drawHabitTracker(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'meal-planner':
      drawMealPlanner(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'budget-monthly':
    case 'budget-weekly':
      drawBudgetSheet(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'todo-list':
    case 'shopping-list':
    case 'packing-list':
      drawChecklist(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'bingo-card':
      drawBingoCard(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'sudoku':
      drawSudoku(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'tic-tac-toe':
      drawTicTacToe(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'soccer-field':
      drawSoccerField(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'basketball-court':
      drawBasketballCourt(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'bracket':
      drawTournamentBracket(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'gift-tags':
    case 'luggage-tags':
      drawTags(ctx, w, h, ml, mr, mt, mb, config, scale, templateId === 'luggage-tags');
      return true;
    case 'postcard':
      drawPostcard(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'business-card':
    case 'name-badge':
      drawBusinessCards(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'bifold':
      drawBifold(ctx, w, h, config, scale);
      return true;
    case 'trifold':
      drawTrifold(ctx, w, h, config, scale);
      return true;
    case 'wireframe-desktop':
      drawDesktopWireframe(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'wireframe-mobile':
      drawMobileWireframe(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'target-circle':
      drawCircleTarget(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'target-crosshair':
      drawCrosshairTarget(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case 'quilting':
    case 'knitting':
    case 'cross-stitch':
    case 'beadwork':
    case 'needlework':
    case 'crochet':
    case 'diamond-painting':
      drawCraftGrid(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    case '3d-cube':
      draw3DCubeNet(ctx, w, h, ml, mr, mt, mb, config, scale);
      return true;
    default:
      return false;
  }
}

function drawPolarGraph(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const cx = w / 2;
  const cy = h / 2;
  const maxRadius = Math.min(w - ml - mr, h - mt - mb) / 2;
  const rings = 10;
  const radialLines = 12;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;

  // Concentric circles
  for (let i = 1; i <= rings; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, (maxRadius / rings) * i, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Radial lines
  for (let i = 0; i < radialLines; i++) {
    const angle = (Math.PI * 2 / radialLines) * i;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * maxRadius, cy + Math.sin(angle) * maxRadius);
    ctx.stroke();
  }

  // Center dot
  ctx.fillStyle = config.lineColor;
  ctx.beginPath();
  ctx.arc(cx, cy, 3 * scale, 0, Math.PI * 2);
  ctx.fill();
}

function drawLogLog(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const decades = 3;

  ctx.strokeStyle = config.lineColor;
  
  // Draw log lines for both axes
  const drawLogLines = (start: number, end: number, isVertical: boolean) => {
    const decadeSize = (end - start) / decades;
    for (let d = 0; d < decades; d++) {
      for (let i = 1; i <= 9; i++) {
        const pos = start + d * decadeSize + Math.log10(i) * decadeSize;
        ctx.lineWidth = i === 1 ? 1.5 : 0.5;
        ctx.beginPath();
        if (isVertical) {
          ctx.moveTo(pos, startY);
          ctx.lineTo(pos, endY);
        } else {
          ctx.moveTo(startX, pos);
          ctx.lineTo(endX, pos);
        }
        ctx.stroke();
      }
    }
  };

  drawLogLines(startX, endX, true);
  drawLogLines(startY, endY, false);
}

function drawSemiLog(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const decades = 3;
  const linearLines = 10;

  ctx.strokeStyle = config.lineColor;
  
  // Log scale on Y
  const decadeSize = (endY - startY) / decades;
  for (let d = 0; d < decades; d++) {
    for (let i = 1; i <= 9; i++) {
      const y = startY + d * decadeSize + Math.log10(i) * decadeSize;
      ctx.lineWidth = i === 1 ? 1.5 : 0.5;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
  }

  // Linear on X
  ctx.lineWidth = 0.5;
  const gap = (endX - startX) / linearLines;
  for (let i = 0; i <= linearLines; i++) {
    ctx.beginPath();
    ctx.moveTo(startX + i * gap, startY);
    ctx.lineTo(startX + i * gap, endY);
    ctx.stroke();
  }
}

function drawOctagonGrid(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const size = mmToPixels(config.gridSize) * scale;
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  const side = size * 0.414; // octagon geometry
  const step = size + side * 2;

  for (let y = startY + size / 2; y < endY; y += step) {
    for (let x = startX + size / 2; x < endX; x += step) {
      drawOctagon(ctx, x, y, size / 2);
    }
  }
}

function drawOctagon(ctx: Ctx, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i - Math.PI / 8;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawPentagonGrid(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const size = mmToPixels(config.gridSize) * scale;
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  const step = size * 1.9;

  for (let y = startY + size; y < endY; y += step) {
    for (let x = startX + size; x < endX; x += step * 1.3) {
      drawPentagon(ctx, x, y, size / 2);
    }
  }
}

function drawPentagon(ctx: Ctx, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawTriangleGrid(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const size = mmToPixels(config.gridSize) * scale;
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;

  const h2 = size * Math.sqrt(3) / 2;

  // Horizontal lines
  for (let y = startY; y <= endY; y += h2) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }

  // Diagonal lines (left to right)
  for (let x = startX - (endY - startY); x <= endX; x += size) {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x + (endY - startY) / Math.tan(Math.PI / 3), endY);
    ctx.stroke();
  }

  // Diagonal lines (right to left)
  for (let x = startX; x <= endX + (endY - startY); x += size) {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x - (endY - startY) / Math.tan(Math.PI / 3), endY);
    ctx.stroke();
  }
}

function draw1PointPerspective(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const cx = w / 2;
  const cy = h / 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;

  // Horizon line
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(ml, cy);
  ctx.lineTo(w - mr, cy);
  ctx.stroke();

  // Vanishing point
  ctx.fillStyle = config.lineColor;
  ctx.beginPath();
  ctx.arc(cx, cy, 4 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Radiating lines
  ctx.lineWidth = 0.5;
  const lines = 24;
  for (let i = 0; i < lines; i++) {
    const angle = (Math.PI * 2 / lines) * i;
    const len = Math.max(w, h);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    ctx.stroke();
  }
}

function draw2PointPerspective(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const cy = h / 2;
  const vp1x = ml + 30 * scale;
  const vp2x = w - mr - 30 * scale;

  ctx.strokeStyle = config.lineColor;

  // Horizon line
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(ml, cy);
  ctx.lineTo(w - mr, cy);
  ctx.stroke();

  // Vanishing points
  ctx.fillStyle = config.lineColor;
  ctx.beginPath();
  ctx.arc(vp1x, cy, 4 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(vp2x, cy, 4 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Lines from left VP
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 12; i++) {
    const y = mt + ((h - mt - mb) / 12) * i;
    ctx.beginPath();
    ctx.moveTo(vp1x, cy);
    ctx.lineTo(w - mr, y);
    ctx.stroke();
  }

  // Lines from right VP
  for (let i = 0; i < 12; i++) {
    const y = mt + ((h - mt - mb) / 12) * i;
    ctx.beginPath();
    ctx.moveTo(vp2x, cy);
    ctx.lineTo(ml, y);
    ctx.stroke();
  }
}

function drawCartesian(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number, isQuadrant: boolean) {
  const gridSize = mmToPixels(config.gridSize) * scale;
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const cx = (startX + endX) / 2;
  const cy = (startY + endY) / 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;

  // Grid
  for (let x = isQuadrant ? cx : startX; x <= endX; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }
  for (let x = cx - gridSize; x >= startX; x -= gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }
  for (let y = isQuadrant ? cy : startY; y <= endY; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }
  for (let y = cy - gridSize; y >= startY; y -= gridSize) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX, cy);
  ctx.lineTo(endX, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, startY);
  ctx.lineTo(cx, endY);
  ctx.stroke();

  // Arrow heads
  const arrowSize = 8 * scale;
  ctx.fillStyle = '#1f2937';
  // Right arrow
  ctx.beginPath();
  ctx.moveTo(endX, cy);
  ctx.lineTo(endX - arrowSize, cy - arrowSize / 2);
  ctx.lineTo(endX - arrowSize, cy + arrowSize / 2);
  ctx.closePath();
  ctx.fill();
  // Up arrow
  ctx.beginPath();
  ctx.moveTo(cx, startY);
  ctx.lineTo(cx - arrowSize / 2, startY + arrowSize);
  ctx.lineTo(cx + arrowSize / 2, startY + arrowSize);
  ctx.closePath();
  ctx.fill();
}

function drawGuitarTab(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const lineSpacing = mmToPixels(config.lineSpacing) * scale;
  const startX = ml;
  const endX = w - mr;
  const endY = h - mb;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  const strings = 6;
  const staffHeight = lineSpacing * (strings - 1);
  const staffGap = mmToPixels(12) * scale;

  let staffY = mt + lineSpacing * 2;

  while (staffY + staffHeight <= endY) {
    for (let i = 0; i < strings; i++) {
      ctx.beginPath();
      ctx.moveTo(startX, staffY + i * lineSpacing);
      ctx.lineTo(endX, staffY + i * lineSpacing);
      ctx.stroke();
    }
    staffY += staffHeight + staffGap;
  }
}

function drawPianoStaff(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const lineSpacing = mmToPixels(config.lineSpacing) * scale;
  const startX = ml;
  const endX = w - mr;
  const endY = h - mb;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  const staffHeight = lineSpacing * 4;
  const staffGap = mmToPixels(8) * scale;
  const grandStaffGap = mmToPixels(20) * scale;

  let staffY = mt + lineSpacing * 2;

  while (staffY + staffHeight * 2 + staffGap <= endY) {
    // Treble staff
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(startX, staffY + i * lineSpacing);
      ctx.lineTo(endX, staffY + i * lineSpacing);
      ctx.stroke();
    }
    // Bass staff
    const bassY = staffY + staffHeight + staffGap;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(startX, bassY + i * lineSpacing);
      ctx.lineTo(endX, bassY + i * lineSpacing);
      ctx.stroke();
    }
    // Brace line
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, staffY);
    ctx.lineTo(startX, bassY + staffHeight);
    ctx.stroke();
    ctx.lineWidth = 1;

    staffY += staffHeight * 2 + staffGap + grandStaffGap;
  }
}

function drawComicStrip(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const contentW = w - ml - mr;
  const contentH = h - mt - mb;
  const cols = 3;
  const rows = 2;
  const gap = mmToPixels(5) * scale;
  const panelW = (contentW - gap * (cols - 1)) / cols;
  const panelH = (contentH - gap * (rows - 1)) / rows;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = ml + col * (panelW + gap);
      const y = mt + row * (panelH + gap);
      ctx.strokeRect(x, y, panelW, panelH);
    }
  }
}

function drawFlashcards(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const contentW = w - ml - mr;
  const contentH = h - mt - mb;
  const cols = 2;
  const rows = 3;
  const gap = mmToPixels(8) * scale;
  const cardW = (contentW - gap * (cols - 1)) / cols;
  const cardH = (contentH - gap * (rows - 1)) / rows;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5 * scale, 5 * scale]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = ml + col * (cardW + gap);
      const y = mt + row * (cardH + gap);
      ctx.strokeRect(x, y, cardW, cardH);
    }
  }
  ctx.setLineDash([]);
}

function drawColumnar(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number, cols: number) {
  const lineSpacing = mmToPixels(config.lineSpacing) * scale;
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const colWidth = (endX - startX) / cols;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;

  // Horizontal lines
  for (let y = startY + lineSpacing; y <= endY; y += lineSpacing) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }

  // Column dividers
  ctx.lineWidth = 1;
  for (let i = 1; i < cols; i++) {
    const x = startX + i * colWidth;
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }

  // Border
  ctx.lineWidth = 1.5;
  ctx.strokeRect(startX, startY, endX - startX, endY - startY);
}

function drawWeeklyPlanner(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const colWidth = (endX - startX) / days.length;
  const headerHeight = mmToPixels(10) * scale;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  // Header row
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(startX, startY, endX - startX, headerHeight);
  ctx.strokeRect(startX, startY, endX - startX, headerHeight);

  // Day labels
  ctx.fillStyle = '#374151';
  ctx.font = `bold ${12 * scale}px 'Inter', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  days.forEach((day, i) => {
    ctx.fillText(day, startX + i * colWidth + colWidth / 2, startY + headerHeight / 2);
  });

  // Column dividers
  for (let i = 1; i < days.length; i++) {
    const x = startX + i * colWidth;
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }

  // Outer border
  ctx.lineWidth = 1.5;
  ctx.strokeRect(startX, startY, endX - startX, endY - startY);
  ctx.textAlign = 'left';
}

function drawMonthlyCalendar(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const cols = 7;
  const rows = 6;
  const headerHeight = mmToPixels(12) * scale;
  const cellW = (endX - startX) / cols;
  const cellH = (endY - startY - headerHeight) / rows;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  // Header
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(startX, startY, endX - startX, headerHeight);

  ctx.fillStyle = '#374151';
  ctx.font = `bold ${10 * scale}px 'Inter', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  days.forEach((day, i) => {
    ctx.fillText(day, startX + i * cellW + cellW / 2, startY + headerHeight / 2);
  });

  // Grid
  for (let row = 0; row <= rows; row++) {
    const y = startY + headerHeight + row * cellH;
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }
  for (let col = 0; col <= cols; col++) {
    const x = startX + col * cellW;
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }

  ctx.textAlign = 'left';
}

function drawHabitTracker(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const labelWidth = mmToPixels(40) * scale;
  const days = 31;
  const rows = 10;
  const cellW = (endX - startX - labelWidth) / days;
  const cellH = (endY - startY) / (rows + 1);

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;

  // Header numbers
  ctx.fillStyle = '#6b7280';
  ctx.font = `${8 * scale}px 'Inter', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  for (let d = 1; d <= days; d++) {
    ctx.fillText(String(d), startX + labelWidth + (d - 0.5) * cellW, startY + cellH / 2);
  }

  // Grid
  for (let row = 1; row <= rows; row++) {
    const y = startY + row * cellH;
    ctx.beginPath();
    ctx.moveTo(startX + labelWidth, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }
  for (let col = 0; col <= days; col++) {
    const x = startX + labelWidth + col * cellW;
    ctx.beginPath();
    ctx.moveTo(x, startY + cellH);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }

  // Label column border
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(startX + labelWidth, startY + cellH);
  ctx.lineTo(startX + labelWidth, endY);
  ctx.stroke();

  ctx.textAlign = 'left';
}

function drawMealPlanner(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const labelWidth = mmToPixels(25) * scale;
  const headerHeight = mmToPixels(10) * scale;
  const colWidth = (endX - startX - labelWidth) / meals.length;
  const rowHeight = (endY - startY - headerHeight) / days.length;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  // Meal headers
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(startX + labelWidth, startY, endX - startX - labelWidth, headerHeight);
  ctx.fillStyle = '#374151';
  ctx.font = `bold ${9 * scale}px 'Inter', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  meals.forEach((meal, i) => {
    ctx.fillText(meal, startX + labelWidth + i * colWidth + colWidth / 2, startY + headerHeight / 2 + 3 * scale);
  });

  // Day labels
  ctx.textAlign = 'left';
  ctx.font = `bold ${10 * scale}px 'Inter', system-ui, sans-serif`;
  days.forEach((day, i) => {
    ctx.fillText(day, startX + 5 * scale, startY + headerHeight + i * rowHeight + rowHeight / 2 + 3 * scale);
  });

  // Grid
  for (let row = 0; row <= days.length; row++) {
    const y = startY + headerHeight + row * rowHeight;
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }
  for (let col = 0; col <= meals.length; col++) {
    const x = startX + labelWidth + col * colWidth;
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }

  ctx.lineWidth = 1.5;
  ctx.strokeRect(startX, startY, endX - startX, endY - startY);
}

function drawBudgetSheet(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const cols = ['Category', 'Budgeted', 'Actual', 'Difference'];
  const colWidths = [0.4, 0.2, 0.2, 0.2];
  const headerHeight = mmToPixels(10) * scale;
  const rowHeight = mmToPixels(config.lineSpacing) * scale;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  // Header
  ctx.fillStyle = '#dcfce7';
  ctx.fillRect(startX, startY, endX - startX, headerHeight);
  ctx.fillStyle = '#166534';
  ctx.font = `bold ${10 * scale}px 'Inter', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  let xPos = startX;
  cols.forEach((col, i) => {
    const cw = (endX - startX) * colWidths[i];
    ctx.fillText(col, xPos + cw / 2, startY + headerHeight / 2 + 3 * scale);
    xPos += cw;
  });

  // Rows
  for (let y = startY + headerHeight; y <= endY; y += rowHeight) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }

  // Columns
  xPos = startX;
  colWidths.forEach((cw) => {
    xPos += (endX - startX) * cw;
    ctx.beginPath();
    ctx.moveTo(xPos, startY);
    ctx.lineTo(xPos, endY);
    ctx.stroke();
  });

  ctx.lineWidth = 1.5;
  ctx.strokeRect(startX, startY, endX - startX, endY - startY);
  ctx.textAlign = 'left';
}

function drawChecklist(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const lineSpacing = mmToPixels(config.lineSpacing) * scale;
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const checkboxSize = lineSpacing * 0.6;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  for (let y = startY + lineSpacing; y <= endY; y += lineSpacing) {
    // Checkbox
    ctx.strokeRect(startX - checkboxSize - 5 * scale, y - checkboxSize / 2, checkboxSize, checkboxSize);
    // Line
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }
}

function drawBingoCard(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const size = Math.min(w - ml - mr, h - mt - mb);
  const startX = ml + (w - ml - mr - size) / 2;
  const startY = mt + (h - mt - mb - size) / 2;
  const cells = 5;
  const cellSize = size / cells;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 2;

  // Grid
  for (let i = 0; i <= cells; i++) {
    ctx.beginPath();
    ctx.moveTo(startX + i * cellSize, startY);
    ctx.lineTo(startX + i * cellSize, startY + size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(startX, startY + i * cellSize);
    ctx.lineTo(startX + size, startY + i * cellSize);
    ctx.stroke();
  }

  // BINGO letters
  const letters = ['B', 'I', 'N', 'G', 'O'];
  ctx.fillStyle = '#374151';
  ctx.font = `bold ${cellSize * 0.5}px 'Inter', system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  letters.forEach((l, i) => {
    ctx.fillText(l, startX + i * cellSize + cellSize / 2, startY - cellSize * 0.4);
  });

  // Free space
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(startX + 2 * cellSize + 2, startY + 2 * cellSize + 2, cellSize - 4, cellSize - 4);
  ctx.fillStyle = '#6b7280';
  ctx.font = `bold ${cellSize * 0.25}px 'Inter', system-ui, sans-serif`;
  ctx.fillText('FREE', startX + 2.5 * cellSize, startY + 2.5 * cellSize);
}

function drawSudoku(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const size = Math.min(w - ml - mr, h - mt - mb);
  const startX = ml + (w - ml - mr - size) / 2;
  const startY = mt + (h - mt - mb - size) / 2;
  const cellSize = size / 9;

  ctx.strokeStyle = config.lineColor;

  // Thin lines
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 9; i++) {
    ctx.beginPath();
    ctx.moveTo(startX + i * cellSize, startY);
    ctx.lineTo(startX + i * cellSize, startY + size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(startX, startY + i * cellSize);
    ctx.lineTo(startX + size, startY + i * cellSize);
    ctx.stroke();
  }

  // Thick lines for 3x3 boxes
  ctx.lineWidth = 2.5;
  for (let i = 0; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(startX + i * 3 * cellSize, startY);
    ctx.lineTo(startX + i * 3 * cellSize, startY + size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(startX, startY + i * 3 * cellSize);
    ctx.lineTo(startX + size, startY + i * 3 * cellSize);
    ctx.stroke();
  }
}

function drawTicTacToe(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const contentW = w - ml - mr;
  const contentH = h - mt - mb;
  const cols = 2;
  const rows = 3;
  const gap = mmToPixels(15) * scale;
  const boardW = (contentW - gap * (cols - 1)) / cols;
  const boardH = (contentH - gap * (rows - 1)) / rows;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 3;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = ml + col * (boardW + gap);
      const y = mt + row * (boardH + gap);
      const cellW = boardW / 3;
      const cellH = boardH / 3;

      // Draw grid lines
      ctx.beginPath();
      ctx.moveTo(x + cellW, y);
      ctx.lineTo(x + cellW, y + boardH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 2 * cellW, y);
      ctx.lineTo(x + 2 * cellW, y + boardH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + cellH);
      ctx.lineTo(x + boardW, y + cellH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + 2 * cellH);
      ctx.lineTo(x + boardW, y + 2 * cellH);
      ctx.stroke();
    }
  }
}

function drawSoccerField(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const fieldW = endX - startX;
  const fieldH = endY - startY;
  const cx = startX + fieldW / 2;
  const cy = startY + fieldH / 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 2;

  // Field outline
  ctx.strokeRect(startX, startY, fieldW, fieldH);

  // Center line
  ctx.beginPath();
  ctx.moveTo(cx, startY);
  ctx.lineTo(cx, endY);
  ctx.stroke();

  // Center circle
  const centerRadius = fieldH * 0.15;
  ctx.beginPath();
  ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = config.lineColor;
  ctx.beginPath();
  ctx.arc(cx, cy, 3 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Penalty areas
  const penaltyW = fieldW * 0.15;
  const penaltyH = fieldH * 0.4;
  ctx.strokeRect(startX, cy - penaltyH / 2, penaltyW, penaltyH);
  ctx.strokeRect(endX - penaltyW, cy - penaltyH / 2, penaltyW, penaltyH);

  // Goal areas
  const goalW = fieldW * 0.05;
  const goalH = fieldH * 0.2;
  ctx.strokeRect(startX, cy - goalH / 2, goalW, goalH);
  ctx.strokeRect(endX - goalW, cy - goalH / 2, goalW, goalH);
}

function drawBasketballCourt(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const fieldW = endX - startX;
  const fieldH = endY - startY;
  const cx = startX + fieldW / 2;
  const cy = startY + fieldH / 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 2;

  // Court outline
  ctx.strokeRect(startX, startY, fieldW, fieldH);

  // Center line
  ctx.beginPath();
  ctx.moveTo(cx, startY);
  ctx.lineTo(cx, endY);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, fieldH * 0.12, 0, Math.PI * 2);
  ctx.stroke();

  // 3-point arcs (simplified)
  const arcRadius = fieldH * 0.35;
  ctx.beginPath();
  ctx.arc(startX + fieldW * 0.1, cy, arcRadius, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(endX - fieldW * 0.1, cy, arcRadius, Math.PI / 2, -Math.PI / 2);
  ctx.stroke();

  // Key/paint areas
  const keyW = fieldW * 0.12;
  const keyH = fieldH * 0.35;
  ctx.strokeRect(startX, cy - keyH / 2, keyW, keyH);
  ctx.strokeRect(endX - keyW, cy - keyH / 2, keyW, keyH);
}

function drawTournamentBracket(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const teams = 8;
  const rounds = Math.log2(teams) + 1;
  const roundWidth = (endX - startX) / (rounds * 2 - 1);
  const slotHeight = (endY - startY) / teams;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1.5;

  // Left bracket
  let currentTeams = teams / 2;
  let x = startX;
  for (let round = 0; round < rounds - 1; round++) {
    const currentSlotHeight = slotHeight * Math.pow(2, round);
    for (let i = 0; i < currentTeams; i++) {
      const y = startY + currentSlotHeight * (i + 0.5) + (currentSlotHeight * i);
      // Slot line
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + roundWidth * 0.8, y);
      ctx.stroke();
      // Connector
      if (round < rounds - 2 && i % 2 === 0 && i + 1 < currentTeams) {
        const nextY = startY + currentSlotHeight * (i + 1.5) + (currentSlotHeight * (i + 1));
        ctx.beginPath();
        ctx.moveTo(x + roundWidth * 0.8, y);
        ctx.lineTo(x + roundWidth * 0.8, nextY);
        ctx.lineTo(x + roundWidth, (y + nextY) / 2);
        ctx.stroke();
      }
    }
    x += roundWidth;
    currentTeams = Math.ceil(currentTeams / 2);
  }

  // Finals line in center
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX + (endX - startX) / 2 - roundWidth * 0.4, startY + (endY - startY) / 2);
  ctx.lineTo(startX + (endX - startX) / 2 + roundWidth * 0.4, startY + (endY - startY) / 2);
  ctx.stroke();
}

function drawTags(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number, isLuggage: boolean) {
  const cols = 3;
  const rows = isLuggage ? 3 : 4;
  const gap = mmToPixels(8) * scale;
  const contentW = w - ml - mr;
  const contentH = h - mt - mb;
  const tagW = (contentW - gap * (cols - 1)) / cols;
  const tagH = (contentH - gap * (rows - 1)) / rows;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4 * scale, 4 * scale]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = ml + col * (tagW + gap);
      const y = mt + row * (tagH + gap);

      if (isLuggage) {
        // Luggage tag with hole
        ctx.beginPath();
        ctx.roundRect(x, y, tagW, tagH, 8 * scale);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + tagW / 2, y + 15 * scale, 5 * scale, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Gift tag with pointed end
        ctx.beginPath();
        ctx.moveTo(x + tagW / 2, y);
        ctx.lineTo(x + tagW, y + tagH * 0.15);
        ctx.lineTo(x + tagW, y + tagH);
        ctx.lineTo(x, y + tagH);
        ctx.lineTo(x, y + tagH * 0.15);
        ctx.closePath();
        ctx.stroke();
        // Hole
        ctx.beginPath();
        ctx.arc(x + tagW / 2, y + tagH * 0.15, 4 * scale, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }
  ctx.setLineDash([]);
}

function drawPostcard(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const contentW = w - ml - mr;
  const contentH = h - mt - mb;
  const cardW = contentW;
  const cardH = contentH / 2;
  const gap = mmToPixels(10) * scale;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5 * scale, 5 * scale]);

  for (let i = 0; i < 2; i++) {
    const x = ml;
    const y = mt + i * (cardH + gap);

    // Card outline
    ctx.strokeRect(x, y, cardW, cardH);

    // Divider line
    ctx.beginPath();
    ctx.moveTo(x + cardW / 2, y);
    ctx.lineTo(x + cardW / 2, y + cardH);
    ctx.stroke();

    // Address lines
    const lineY = y + cardH * 0.4;
    for (let l = 0; l < 4; l++) {
      ctx.beginPath();
      ctx.moveTo(x + cardW / 2 + 10 * scale, lineY + l * 15 * scale);
      ctx.lineTo(x + cardW - 10 * scale, lineY + l * 15 * scale);
      ctx.stroke();
    }

    // Stamp box
    const stampSize = 25 * scale;
    ctx.strokeRect(x + cardW - stampSize - 10 * scale, y + 10 * scale, stampSize, stampSize);
  }
  ctx.setLineDash([]);
}

function drawBusinessCards(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const cols = 2;
  const rows = 5;
  const gap = mmToPixels(3) * scale;
  const contentW = w - ml - mr;
  const contentH = h - mt - mb;
  const cardW = (contentW - gap * (cols - 1)) / cols;
  const cardH = (contentH - gap * (rows - 1)) / rows;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;
  ctx.setLineDash([3 * scale, 3 * scale]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = ml + col * (cardW + gap);
      const y = mt + row * (cardH + gap);
      ctx.strokeRect(x, y, cardW, cardH);
    }
  }
  ctx.setLineDash([]);
}

function drawBifold(ctx: Ctx, w: number, h: number, config: TemplateConfig, scale: number) {
  const cx = w / 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  ctx.setLineDash([8 * scale, 4 * scale]);

  // Center fold line
  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, h);
  ctx.stroke();

  ctx.setLineDash([]);
}

function drawTrifold(ctx: Ctx, w: number, h: number, config: TemplateConfig, scale: number) {
  const fold1 = w / 3;
  const fold2 = (w / 3) * 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;
  ctx.setLineDash([8 * scale, 4 * scale]);

  // Fold lines
  ctx.beginPath();
  ctx.moveTo(fold1, 0);
  ctx.lineTo(fold1, h);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(fold2, 0);
  ctx.lineTo(fold2, h);
  ctx.stroke();

  ctx.setLineDash([]);
}

function drawDesktopWireframe(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;
  const contentW = endX - startX;
  const contentH = endY - startY;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1;

  // Browser chrome
  const chromeH = 30 * scale;
  ctx.strokeRect(startX, startY, contentW, chromeH);
  
  // Address bar
  ctx.strokeRect(startX + 80 * scale, startY + 8 * scale, contentW - 160 * scale, 14 * scale);

  // Header
  const headerH = 50 * scale;
  ctx.strokeRect(startX, startY + chromeH, contentW, headerH);

  // Sidebar
  const sidebarW = contentW * 0.2;
  ctx.strokeRect(startX, startY + chromeH + headerH, sidebarW, contentH - chromeH - headerH);

  // Content grid
  const cols = 12;
  const gridSize = (contentW - sidebarW) / cols;
  ctx.lineWidth = 0.3;
  for (let i = 0; i <= cols; i++) {
    const x = startX + sidebarW + i * gridSize;
    ctx.beginPath();
    ctx.moveTo(x, startY + chromeH + headerH);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }
}

function drawMobileWireframe(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const phoneW = Math.min(w - ml - mr, (h - mt - mb) * 0.5);
  const phoneH = phoneW * 2;
  const startX = ml + (w - ml - mr - phoneW) / 2;
  const startY = mt + (h - mt - mb - phoneH) / 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 2;

  // Phone outline
  ctx.beginPath();
  ctx.roundRect(startX, startY, phoneW, phoneH, 20 * scale);
  ctx.stroke();

  // Status bar
  const statusH = 20 * scale;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(startX, startY + statusH);
  ctx.lineTo(startX + phoneW, startY + statusH);
  ctx.stroke();

  // Navigation bar
  const navH = 40 * scale;
  ctx.beginPath();
  ctx.moveTo(startX, startY + phoneH - navH);
  ctx.lineTo(startX + phoneW, startY + phoneH - navH);
  ctx.stroke();

  // Home indicator
  ctx.beginPath();
  ctx.roundRect(startX + phoneW / 2 - 40 * scale, startY + phoneH - 15 * scale, 80 * scale, 5 * scale, 3 * scale);
  ctx.stroke();
}

function drawCircleTarget(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const size = Math.min(w - ml - mr, h - mt - mb);
  const cx = ml + (w - ml - mr) / 2;
  const cy = mt + (h - mt - mb) / 2;
  const rings = 10;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 1.5;

  for (let i = rings; i >= 1; i--) {
    const r = (size / 2) * (i / rings);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Center bullseye
  ctx.fillStyle = config.lineColor;
  ctx.beginPath();
  ctx.arc(cx, cy, (size / 2) * 0.05, 0, Math.PI * 2);
  ctx.fill();

  // Crosshairs
  ctx.beginPath();
  ctx.moveTo(cx - size / 2, cy);
  ctx.lineTo(cx + size / 2, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - size / 2);
  ctx.lineTo(cx, cy + size / 2);
  ctx.stroke();
}

function drawCrosshairTarget(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const size = Math.min(w - ml - mr, h - mt - mb);
  const cx = ml + (w - ml - mr) / 2;
  const cy = mt + (h - mt - mb) / 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 2;

  // Outer circle
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.stroke();

  // Crosshairs
  const gap = size * 0.05;
  ctx.beginPath();
  ctx.moveTo(cx - size / 2, cy);
  ctx.lineTo(cx - gap, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + gap, cy);
  ctx.lineTo(cx + size / 2, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - size / 2);
  ctx.lineTo(cx, cy - gap);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy + gap);
  ctx.lineTo(cx, cy + size / 2);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = config.lineColor;
  ctx.beginPath();
  ctx.arc(cx, cy, 3 * scale, 0, Math.PI * 2);
  ctx.fill();
}

function drawCraftGrid(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const gridSize = mmToPixels(config.gridSize) * scale;
  const startX = ml;
  const endX = w - mr;
  const startY = mt;
  const endY = h - mb;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 0.5;

  // Grid with color
  for (let x = startX; x <= endX; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }
  for (let y = startY; y <= endY; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }

  // Thicker lines every 10 cells
  ctx.lineWidth = 1.5;
  const majorGrid = gridSize * 10;
  for (let x = startX; x <= endX; x += majorGrid) {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    ctx.stroke();
  }
  for (let y = startY; y <= endY; y += majorGrid) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();
  }
}

function draw3DCubeNet(ctx: Ctx, w: number, h: number, ml: number, mr: number, mt: number, mb: number, config: TemplateConfig, scale: number) {
  const contentW = w - ml - mr;
  const contentH = h - mt - mb;
  const faceSize = Math.min(contentW / 4, contentH / 3);
  const startX = ml + (contentW - faceSize * 4) / 2;
  const startY = mt + (contentH - faceSize * 3) / 2;

  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = 2;

  // Cross pattern for cube net
  // Top
  ctx.strokeRect(startX + faceSize, startY, faceSize, faceSize);
  // Middle row
  ctx.strokeRect(startX, startY + faceSize, faceSize, faceSize);
  ctx.strokeRect(startX + faceSize, startY + faceSize, faceSize, faceSize);
  ctx.strokeRect(startX + 2 * faceSize, startY + faceSize, faceSize, faceSize);
  ctx.strokeRect(startX + 3 * faceSize, startY + faceSize, faceSize, faceSize);
  // Bottom
  ctx.strokeRect(startX + faceSize, startY + 2 * faceSize, faceSize, faceSize);

  // Fold lines (dashed)
  ctx.setLineDash([5 * scale, 5 * scale]);
  ctx.lineWidth = 1;

  // Vertical fold lines
  ctx.beginPath();
  ctx.moveTo(startX + faceSize, startY);
  ctx.lineTo(startX + faceSize, startY + 3 * faceSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(startX + 2 * faceSize, startY);
  ctx.lineTo(startX + 2 * faceSize, startY + 3 * faceSize);
  ctx.stroke();

  // Horizontal fold lines
  ctx.beginPath();
  ctx.moveTo(startX, startY + faceSize);
  ctx.lineTo(startX + 4 * faceSize, startY + faceSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(startX, startY + 2 * faceSize);
  ctx.lineTo(startX + 4 * faceSize, startY + 2 * faceSize);
  ctx.stroke();

  ctx.setLineDash([]);
}
