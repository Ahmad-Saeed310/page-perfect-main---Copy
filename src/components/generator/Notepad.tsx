import { Textarea } from '@/components/ui/textarea';

interface NotepadProps {
  value: string;
  onChange: (value: string) => void;
}

export function Notepad({ value, onChange }: NotepadProps) {
  return (
    <div className="control-section">
      <label className="control-label">Notepad</label>
      <p className="text-xs text-muted-foreground mb-2">
        Notes are saved locally. Print or export to include them.
      </p>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your notes here..."
        className="notepad-area resize-none min-h-[180px] bg-notepad border-border focus:ring-primary"
      />
    </div>
  );
}
