import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Maximize2, Minimize2, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableNotepadProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExpandableNotepad({ value, onChange }: ExpandableNotepadProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const wordCount = value.split(/\s+/).filter(Boolean).length;

  if (!isExpanded) {
    return (
      <div className="control-section">
        <Button
          variant="outline"
          className="w-full gap-2 h-12 justify-start bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-200 dark:border-amber-800 hover:from-amber-100 hover:to-yellow-100 dark:hover:from-amber-900/40 dark:hover:to-yellow-900/40"
          onClick={() => setIsExpanded(true)}
        >
          <StickyNote className="w-5 h-5 text-amber-600" />
          <div className="text-left flex-1">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Open Notepad</p>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              {wordCount > 0 ? `${wordCount} words saved` : 'Click to write notes'}
            </p>
          </div>
        </Button>
      </div>
    );
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background p-4 md:p-8 flex flex-col">
        <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <StickyNote className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold">Notepad</h2>
              <span className="text-sm text-muted-foreground">
                {wordCount} words
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="h-8 w-8 p-0"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsFullscreen(false);
                  setIsExpanded(false);
                }}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your notes here... They'll appear on your printed page."
            autoFocus
            className="flex-1 resize-none bg-notepad border-amber-200 dark:border-amber-800 text-lg leading-relaxed focus:ring-amber-400"
          />
          <p className="text-center text-xs text-muted-foreground mt-2">
            Press Escape to minimize • Auto-saved locally
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="control-section">
      <div className="flex items-center justify-between mb-2">
        <label className="control-label flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-amber-600" />
          Notepad
        </label>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(true)}
            className="h-7 w-7 p-0"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="h-7 w-7 p-0"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-2">
        {wordCount} words • Notes appear on printed pages
      </p>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your notes here..."
        className="notepad-area resize-none min-h-[180px] bg-notepad border-amber-200 dark:border-amber-800 focus:ring-amber-400"
      />
    </div>
  );
}
