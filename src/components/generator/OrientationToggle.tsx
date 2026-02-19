import { Orientation } from '@/lib/paperSizes';
import { Button } from '@/components/ui/button';
import { MonitorSmartphone, Smartphone } from 'lucide-react';

interface OrientationToggleProps {
  value: Orientation;
  onChange: (orientation: Orientation) => void;
}

export function OrientationToggle({ value, onChange }: OrientationToggleProps) {
  return (
    <div className="control-section">
      <label className="control-label">Orientation</label>
      <div className="flex gap-2 mt-2">
        <Button
          variant={value === 'portrait' ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => onChange('portrait')}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Portrait
        </Button>
        <Button
          variant={value === 'landscape' ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => onChange('landscape')}
        >
          <MonitorSmartphone className="w-4 h-4 mr-2" />
          Landscape
        </Button>
      </div>
    </div>
  );
}
