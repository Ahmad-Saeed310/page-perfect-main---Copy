import { useState } from 'react';
import { 
  MousePointer2, 
  Move, 
  Type, 
  Undo2, 
  Redo2, 
  Trash2, 
  Bold, 
  Italic, 
  Plus, 
  Minus,
  Menu,
  X,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CanvasTool = 'select' | 'text' | 'move';

interface MobileFabMenuProps {
  activeTool: CanvasTool;
  onToolChange: (tool: CanvasTool) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  selectedTextId: string | null;
  selectedText?: {
    bold: boolean;
    italic: boolean;
    fontSize: number;
    color: string;
  };
  onToggleBold: () => void;
  onToggleItalic: () => void;
  onChangeFontSize: (delta: number) => void;
  onChangeColor: (color: string) => void;
  onDeleteText: () => void;
}

const TEXT_COLORS = [
  '#1a1a1a', '#374151', '#1e40af', '#047857', '#b91c1c', '#7c3aed', '#c2410c'
];

const TOOL_CONFIG = {
  select: { icon: MousePointer2, label: 'Select' },
  text: { icon: Type, label: 'Text' },
  move: { icon: Move, label: 'Move' },
};

export function MobileFabMenu({
  activeTool,
  onToolChange,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  selectedTextId,
  selectedText,
  onToggleBold,
  onToggleItalic,
  onChangeFontSize,
  onChangeColor,
  onDeleteText,
}: MobileFabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const ActiveIcon = TOOL_CONFIG[activeTool].icon;

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      {/* Color Picker Panel */}
      {showColors && selectedText && (
        <div className="absolute bottom-16 right-0 bg-card/95 backdrop-blur-lg border border-border/50 rounded-xl p-3 shadow-xl animate-scale-in mb-2">
          <div className="flex gap-2 flex-wrap max-w-[180px]">
            {TEXT_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onChangeColor(color);
                  setShowColors(false);
                }}
                className={cn(
                  "w-8 h-8 rounded-full transition-all duration-200 hover:scale-110",
                  selectedText.color === color 
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" 
                    : "hover:ring-1 hover:ring-muted-foreground/30"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Expanded Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card/95 backdrop-blur-lg border border-border/50 rounded-xl p-2 shadow-xl animate-scale-in mb-2 min-w-[200px]">
          {/* Tools Section */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground px-2 font-medium">Tools</p>
            <div className="grid grid-cols-3 gap-1">
              {(Object.keys(TOOL_CONFIG) as CanvasTool[]).map((tool) => {
                const { icon: Icon, label } = TOOL_CONFIG[tool];
                return (
                  <Button
                    key={tool}
                    variant={activeTool === tool ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      onToolChange(tool);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "h-12 flex-col gap-1 text-xs",
                      activeTool === tool && "shadow-md"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* History Section */}
          <div className="mt-3 pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground px-2 font-medium mb-2">History</p>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onUndo?.();
                }}
                disabled={!canUndo}
                className="flex-1 h-10 gap-2"
              >
                <Undo2 className="w-4 h-4" />
                Undo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onRedo?.();
                }}
                disabled={!canRedo}
                className="flex-1 h-10 gap-2"
              >
                <Redo2 className="w-4 h-4" />
                Redo
              </Button>
            </div>
          </div>

          {/* Text Formatting (when text is selected) */}
          {selectedTextId && selectedText && (
            <div className="mt-3 pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground px-2 font-medium mb-2">Format Text</p>
              
              <div className="flex gap-1 mb-2">
                <Button
                  variant={selectedText.bold ? 'default' : 'ghost'}
                  size="sm"
                  onClick={onToggleBold}
                  className="flex-1 h-10"
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedText.italic ? 'default' : 'ghost'}
                  size="sm"
                  onClick={onToggleItalic}
                  className="flex-1 h-10"
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowColors(!showColors)}
                  className="flex-1 h-10"
                >
                  <Palette className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onChangeFontSize(-2)}
                  className="h-9 w-9 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="flex-1 text-center text-sm font-medium tabular-nums">
                  {Math.round(selectedText.fontSize)}px
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onChangeFontSize(2)}
                  className="h-9 w-9 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onDeleteText();
                  setIsOpen(false);
                }}
                className="w-full h-10 mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Text
              </Button>
            </div>
          )}
        </div>
      )}

      {/* FAB Button */}
      <Button
        size="lg"
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setShowColors(false);
        }}
        className={cn(
          "h-14 w-14 rounded-full shadow-xl transition-all duration-300",
          isOpen 
            ? "bg-muted text-muted-foreground hover:bg-muted/80 rotate-0" 
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <ActiveIcon className="w-6 h-6" />
        )}
      </Button>

      {/* Quick Tool Indicator */}
      {!isOpen && (
        <div className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
          {TOOL_CONFIG[activeTool].label}
        </div>
      )}
    </div>
  );
}
