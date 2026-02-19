import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { PaperSize, getPdfDimensions, Orientation, getEffectiveDimensions } from '@/lib/paperSizes';
import { TemplateConfig } from '@/lib/templates';
import { renderForExport } from '@/lib/canvasRenderer';
import { TextElement, CanvasImageData } from '@/lib/canvasTypes';
import { toast } from 'sonner';

interface ExportControlsProps {
  paperSize: PaperSize;
  templateId: string;
  config: TemplateConfig;
  notepadText: string;
  textElements: TextElement[];
  images: CanvasImageData[];
  orientation: Orientation;
}

export function ExportControls({
  paperSize,
  templateId,
  config,
  notepadText,
  textElements,
  images,
  orientation,
}: ExportControlsProps) {
  const handleDownloadPdf = async () => {
    try {
      const { width, height } = getPdfDimensions(paperSize, orientation);
      const pdfOrientation = width > height ? 'landscape' : 'portrait';

      const pdf = new jsPDF({
        orientation: pdfOrientation,
        unit: 'pt',
        format: [width, height],
      });

      const canvas = await renderForExport(paperSize, templateId, config, 150, notepadText, textElements, images, orientation);
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      
      // Add clickable link at the bottom
      const linkText = 'allprintablepages.com';
      const linkUrl = 'https://allprintablepages.com';
      const linkY = height - 15;
      const linkX = width / 2;
      
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      const textWidth = pdf.getTextWidth(linkText);
      pdf.textWithLink(linkText, linkX - textWidth / 2, linkY, { url: linkUrl });

      const filename = `${templateId}-${paperSize.name.toLowerCase()}-${orientation}.pdf`;
      pdf.save(filename);

      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF. Please try again.');
    }
  };

  const handlePrint = async () => {
    try {
      const dims = getEffectiveDimensions(paperSize, orientation);
      const canvas = await renderForExport(paperSize, templateId, config, 150, notepadText, textElements, images, orientation);
      const imgData = canvas.toDataURL('image/png');

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error('Please allow popups to print.');
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print - ${paperSize.name} ${templateId}</title>
            <style>
              @page {
                size: ${dims.width}mm ${dims.height}mm;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: flex-start;
              }
              img {
                width: ${dims.width}mm;
                height: ${dims.height}mm;
                max-width: 100%;
              }
              @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            </style>
          </head>
          <body>
            <img src="${imgData}" />
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
      }, 250);
    } catch (error) {
      console.error('Print error:', error);
      toast.error('Failed to print. Please try again.');
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handlePrint} variant="outline" className="flex-1 h-9 text-sm" size="sm">
        <Printer className="w-4 h-4 mr-1.5" />
        Print
      </Button>
      <Button onClick={handleDownloadPdf} className="flex-1 h-9 text-sm" size="sm">
        <Download className="w-4 h-4 mr-1.5" />
        Download PDF
      </Button>
    </div>
  );
}
