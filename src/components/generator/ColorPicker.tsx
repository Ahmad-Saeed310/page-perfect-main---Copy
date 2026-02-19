import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
}

const DEFAULT_LINE_COLORS = [
  '#d1d5db', // Gray
  '#93c5fd', // Blue
  '#c7d2fe', // Indigo
  '#a5b4fc', // Violet
  '#86efac', // Green
  '#fcd34d', // Yellow
  '#fca5a1', // Red
  '#f0abfc', // Pink
];

const DEFAULT_PAGE_COLORS = [
  '#ffffff', // White
  '#fef9c3', // Cream/Yellow
  '#ecfccb', // Light Green
  '#e0f2fe', // Light Blue
  '#fce7f3', // Light Pink
  '#f5f5f4', // Light Gray
  '#fef3c7', // Warm Cream
  '#e5e7eb', // Cool Gray
];

export function ColorPicker({ 
  label, 
  value, 
  onChange, 
  presets = DEFAULT_LINE_COLORS 
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {presets.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={cn(
              'w-7 h-7 rounded-md border-2 transition-all duration-150 hover:scale-110',
              value === color 
                ? 'border-primary ring-2 ring-primary/30' 
                : 'border-border hover:border-primary/50'
            )}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
        <label className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <div 
            className={cn(
              'w-7 h-7 rounded-md border-2 border-dashed border-muted-foreground/50 cursor-pointer',
              'flex items-center justify-center text-xs text-muted-foreground hover:border-primary/50',
              'bg-gradient-to-br from-red-400 via-green-400 to-blue-400'
            )}
            title="Custom color"
          >
            <span className="sr-only">Pick custom color</span>
          </div>
        </label>
      </div>
    </div>
  );
}

export function LineColorPicker(props: Omit<ColorPickerProps, 'presets'>) {
  return <ColorPicker {...props} presets={DEFAULT_LINE_COLORS} />;
}

export function PageColorPicker(props: Omit<ColorPickerProps, 'presets'>) {
  return <ColorPicker {...props} presets={DEFAULT_PAGE_COLORS} />;
}
