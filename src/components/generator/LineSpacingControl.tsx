import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LineSpacingControlProps {
  value: number; // always stored in mm
  onChange: (mmValue: number) => void;
  templateId: string;
}

type Unit = 'mm' | 'cm' | 'in';

const PRESET_GAPS_MM = [4, 5, 6, 7, 8, 9];
const GRID_PRESET_GAPS_MM = [2, 3, 4, 5, 6, 8];

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
  return unit === 'in' ? converted.toFixed(2) : converted.toFixed(1);
};

export function LineSpacingControl({ value, onChange, templateId }: LineSpacingControlProps) {
  const [unit, setUnit] = useState<Unit>('mm');
  const [customMode, setCustomMode] = useState(false);
  const [inputValue, setInputValue] = useState(formatValue(value, unit));

  const isGraph = templateId === 'graph' || templateId === 'working-sheet' || templateId === 'dot-grid' || templateId === 'engineering';
  const presets = isGraph ? GRID_PRESET_GAPS_MM : PRESET_GAPS_MM;
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
    if (!isNaN(numVal) && numVal > 0 && numVal < 100) {
      const mmValue = convertToMm(numVal, unit);
      onChange(Math.max(1, Math.min(50, mmValue)));
    }
  };

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
    setInputValue(formatValue(value, newUnit));
  };

  const toggleCustomMode = () => {
    setCustomMode(!customMode);
    setInputValue(formatValue(value, unit));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
        <button
          onClick={toggleCustomMode}
          className="text-xs text-primary hover:underline"
        >
          {customMode ? 'Use Presets' : 'Custom'}
        </button>
      </div>

      {customMode ? (
        <div className="flex gap-2">
          <Input
            type="number"
            value={inputValue}
            onChange={handleCustomInputChange}
            className="flex-1 h-9"
            step={unit === 'in' ? '0.01' : '0.1'}
            min="0.1"
            max={unit === 'in' ? '2' : unit === 'cm' ? '5' : '50'}
          />
          <div className="flex rounded-md border border-input overflow-hidden">
            {(['mm', 'cm', 'in'] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => handleUnitChange(u)}
                className={cn(
                  'px-2 py-1 text-xs font-medium transition-colors',
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
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {presets.map((gap) => (
            <button
              key={gap}
              onClick={() => handlePresetClick(gap)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150',
                value === gap
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {gap}mm
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
