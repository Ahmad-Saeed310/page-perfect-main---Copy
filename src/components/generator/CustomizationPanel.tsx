import { LineColorPicker, PageColorPicker } from './ColorPicker';
import { LineGapSelector } from './LineGapSelector';

interface CustomizationPanelProps {
  templateId: string;
  lineColor: string;
  pageColor: string;
  lineGap: number;
  onLineColorChange: (color: string) => void;
  onPageColorChange: (color: string) => void;
  onLineGapChange: (gap: number) => void;
}

export function CustomizationPanel({
  templateId,
  lineColor,
  pageColor,
  lineGap,
  onLineColorChange,
  onPageColorChange,
  onLineGapChange,
}: CustomizationPanelProps) {
  const showLineOptions = !['blank', 'thoroughly-blank'].includes(templateId);

  return (
    <div className="control-section space-y-4">
      <label className="control-label">Customization</label>
      
      <PageColorPicker
        label="Page Color"
        value={pageColor}
        onChange={onPageColorChange}
      />
      
      {showLineOptions && (
        <>
          <LineColorPicker
            label="Line Color"
            value={lineColor}
            onChange={onLineColorChange}
          />
          
          <LineGapSelector
            value={lineGap}
            onChange={onLineGapChange}
            templateId={templateId}
          />
        </>
      )}
    </div>
  );
}
