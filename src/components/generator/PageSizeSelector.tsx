import { useState } from 'react';
import { PAPER_SIZES, PaperSize } from '@/lib/paperSizes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PageSizeSelectorProps {
  value: string;
  onChange: (size: PaperSize) => void;
}

export function PageSizeSelector({ value, onChange }: PageSizeSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customWidth, setCustomWidth] = useState('210');
  const [customHeight, setCustomHeight] = useState('297');

  const isoSizes = PAPER_SIZES.filter((s) => s.category === 'iso');
  const usSizes = PAPER_SIZES.filter((s) => s.category === 'us');

  const handleChange = (id: string) => {
    if (id === 'custom') {
      setShowCustom(true);
      return;
    }
    setShowCustom(false);
    const size = PAPER_SIZES.find((s) => s.id === id);
    if (size) onChange(size);
  };

  const applyCustomSize = () => {
    const width = Math.max(50, Math.min(1200, parseInt(customWidth) || 210));
    const height = Math.max(50, Math.min(1200, parseInt(customHeight) || 297));
    
    const customSize: PaperSize = {
      id: 'custom',
      name: 'Custom',
      width,
      height,
      category: 'iso',
    };
    onChange(customSize);
  };

  return (
    <div className="control-section">
      <label className="control-label">Paper Size</label>
      <Select value={showCustom ? 'custom' : value} onValueChange={handleChange}>
        <SelectTrigger className="w-full bg-card">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent className="bg-card z-50">
          <SelectGroup>
            <SelectLabel>ISO Standard</SelectLabel>
            {isoSizes.map((size) => (
              <SelectItem key={size.id} value={size.id}>
                {size.name} ({size.width} × {size.height} mm)
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>US Standard</SelectLabel>
            {usSizes.map((size) => (
              <SelectItem key={size.id} value={size.id}>
                {size.name} ({size.width} × {size.height} mm)
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Custom</SelectLabel>
            <SelectItem value="custom">Custom Size...</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {showCustom && (
        <div className="mt-3 space-y-3 p-3 bg-secondary rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Width (mm)</Label>
              <Input
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                min={50}
                max={1200}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Height (mm)</Label>
              <Input
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                min={50}
                max={1200}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={applyCustomSize} size="sm" className="w-full">
            Apply Custom Size
          </Button>
        </div>
      )}
    </div>
  );
}
