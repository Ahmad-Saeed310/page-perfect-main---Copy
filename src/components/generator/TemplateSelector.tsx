import { TEMPLATES, Template } from '@/lib/templates';
import { cn } from '@/lib/utils';
import {
  File,
  Square,
  LayoutGrid,
  BookOpen,
  AlignLeft,
  Grid3X3,
  Grip,
  Music,
  Ruler,
  NotebookPen,
  Calendar,
  PenTool,
  Box,
  Hexagon,
  Film,
} from 'lucide-react';

interface TemplateSelectorProps {
  value: string;
  onChange: (template: Template) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  file: File,
  square: Square,
  'layout-grid': LayoutGrid,
  'book-open': BookOpen,
  'align-left': AlignLeft,
  'grid-3x3': Grid3X3,
  grip: Grip,
  music: Music,
  ruler: Ruler,
  notebook: NotebookPen,
  calendar: Calendar,
  'pen-tool': PenTool,
  box: Box,
  hexagon: Hexagon,
  film: Film,
};

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="control-section">
      <label className="control-label">Template Style</label>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {TEMPLATES.map((template) => {
          const Icon = iconMap[template.icon] || File;
          const isSelected = value === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onChange(template)}
              className={cn(
                'template-card flex flex-col items-center text-center p-2',
                isSelected && 'selected'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5 mb-1',
                  isSelected ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium leading-tight',
                  isSelected ? 'text-primary' : 'text-foreground'
                )}
              >
                {template.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
