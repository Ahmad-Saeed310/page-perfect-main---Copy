import { useEffect, useRef, memo } from 'react';
import { renderTemplate } from '@/lib/canvasRenderer';
import { getTemplateConfig } from '@/lib/templateConfigs';
import { PAPER_SIZES } from '@/lib/paperSizes';

interface TemplatePreviewProps {
  templateId: string;
  size?: number;
}

export const TemplatePreview = memo(function TemplatePreview({ templateId, size = 48 }: TemplatePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use A4 paper size for preview
    const paperSize = PAPER_SIZES.find(s => s.id === 'a4')!;
    const config = getTemplateConfig(templateId);
    
    // Calculate scale to fit the thumbnail
    const aspectRatio = paperSize.height / paperSize.width;
    const previewWidth = size;
    const previewHeight = size * aspectRatio;
    
    canvas.width = previewWidth * 2; // 2x for retina
    canvas.height = previewHeight * 2;
    canvas.style.width = `${previewWidth}px`;
    canvas.style.height = `${previewHeight}px`;
    
    ctx.scale(2, 2);
    
    // Calculate a tiny scale for preview
    const scale = previewWidth / (paperSize.width * 3.78); // 3.78 = mm to px conversion
    
    // Clear and draw white background
    ctx.fillStyle = config.pageColor || '#ffffff';
    ctx.fillRect(0, 0, previewWidth, previewHeight);
    
    // Render template at tiny scale
    try {
      renderTemplate(ctx, canvas, {
        paperSize,
        templateId,
        config,
        scale: scale / 2,
        orientation: 'portrait',
      });
    } catch (e) {
      // Fallback - draw simple representation
      ctx.strokeStyle = config.lineColor || '#cccccc';
      ctx.lineWidth = 0.5;
      const padding = 4;
      const lineGap = 3;
      for (let y = padding; y < previewHeight - padding; y += lineGap) {
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(previewWidth - padding, y);
        ctx.stroke();
      }
    }
    
    // Draw border
    ctx.strokeStyle = 'hsl(220 13% 85%)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(0.5, 0.5, previewWidth - 1, previewHeight - 1);
  }, [templateId, size]);

  return (
    <canvas 
      ref={canvasRef}
      className="rounded border border-border bg-white shadow-sm flex-shrink-0"
    />
  );
});
