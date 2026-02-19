import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LineGapSelectorProps {
  value: number;
  onChange: (gap: number) => void;
  templateId: string;
}

type Unit = 'mm' | 'cm' | 'in';

const LINE_GAPS = [4, 5, 6, 7, 8, 9]; // in mm
const GRID_GAPS = [3, 4, 5, 6, 7, 8]; // in mm for graph paper

const convertToMm = (value: number, unit: Unit): number => {
  switch (unit) {
    case 'cm': return value * 10;
    case 'in': return value * 25.4;
    default: return value;
  }
};

const convertFromMm = (mm: number, unit: Unit): number => {
  switch (unit) {
    case 'cm': return mm / 10;
    case 'in': return mm / 25.4;
    default: return mm;
  }
};

const formatValue = (value: number, unit: Unit): string => {
  const converted = convertFromMm(value, unit);
  return unit === 'in' ? converted.toFixed(3) : converted.toFixed(1);
};

export function LineGapSelector({ value, onChange, templateId }: LineGapSelectorProps) {
  const [unit, setUnit] = useState<Unit>('mm');
  const [customMode, setCustomMode] = useState(false);
  const [inputValue, setInputValue] = useState(formatValue(value, unit));

  // Different gap options for lined vs graph paper
  const isGraph = templateId === 'graph' || templateId === 'working-sheet' || templateId === 'dot-grid' || templateId === 'engineering';
  const gaps = isGraph ? GRID_GAPS : LINE_GAPS;
  const label = isGraph ? 'Grid Size' : 'Line Spacing';
  
  // Hide for blank templates
  if (templateId === 'blank' || templateId === 'thoroughly-blank') {
    return null;
  }

  const handlePresetClick = (mmValue: number) => {
    setCustomMode(false);
    onChange(mmValue);
    setInputValue(formatValue(mmValue, unit));
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const numVal = parseFloat(val);
    if (!isNaN(numVal) && numVal > 0) {
      const mmValue = convertToMm(numVal, unit);
      if (mmValue >= 1 && mmValue <= 50) {
        onChange(mmValue);
      }
    }
  };

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
    setInputValue(formatValue(value, newUnit));
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      
      <div className="flex flex-wrap gap-1 items-center">
        {gaps.map((gap) => (
          <button
            key={gap}
            onClick={() => handlePresetClick(gap)}
            className={cn(
              'px-2 py-1 rounded text-xs font-medium transition-all duration-150',
              !customMode && value === gap
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {gap}mm
          </button>
        ))}
        <button
          onClick={() => {
            setCustomMode(!customMode);
            setInputValue(formatValue(value, unit));
          }}
          className={cn(
            'px-2 py-1 rounded text-xs font-medium transition-all duration-150',
            customMode
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          Custom
        </button>
      </div>

      {customMode && (
        <div className="flex gap-1.5 mt-1.5">
          <Input
            type="number"
            value={inputValue}
            onChange={handleCustomInputChange}
            className="flex-1 h-7 text-xs"
            step={unit === 'in' ? '0.01' : '0.1'}
            min="0.1"
            max={unit === 'in' ? '2' : unit === 'cm' ? '5' : '50'}
          />
          <div className="flex rounded-md border border-input overflow-hidden shrink-0">
            {(['mm', 'cm', 'in'] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => handleUnitChange(u)}
                className={cn(
                  'px-1.5 py-0.5 text-[10px] font-medium transition-colors',
                  unit === u
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
