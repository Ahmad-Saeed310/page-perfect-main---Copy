import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2, PenLine, Save } from 'lucide-react';

interface FocusModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FocusMode({ isOpen, onClose }: FocusModeProps) {
  const [text, setText] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blankpage-focus-text');
    if (saved) setText(saved);
  }, []);

  // Save to localStorage with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('blankpage-focus-text', text);
      setLastSaved(new Date());
    }, 500);
    return () => clearTimeout(timeout);
  }, [text]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-muted/30 transition-all duration-300 ${
        isFullscreen ? 'p-0' : 'p-4 md:p-8'
      }`}
    >
      <div className={`h-full flex flex-col ${isFullscreen ? '' : 'max-w-4xl mx-auto'}`}>
        {/* Modern toolbar */}
        <div className="flex justify-between items-center mb-4 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-primary">
              <PenLine className="w-5 h-5" />
              <span className="font-semibold text-sm hidden sm:inline">Focus Mode</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="text-xs text-muted-foreground space-x-3">
              <span className="font-medium">{wordCount} words</span>
              <span>{charCount} chars</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lastSaved && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
                <Save className="w-3 h-3" />
                <span className="hidden sm:inline">Saved</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8 p-0"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Writing area */}
        <div className="flex-1 overflow-hidden rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing... Let your thoughts flow freely."
            autoFocus
            className="w-full h-full resize-none bg-transparent border-none outline-none text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/40 focus:ring-0 p-6 md:p-8"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          />
        </div>

        {/* Subtle footer */}
        <div className="text-center py-3">
          <div className="inline-flex items-center gap-4 text-xs text-muted-foreground/50">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Esc</kbd>
              to exit
            </span>
            <span>•</span>
            <span>Auto-saved locally</span>
          </div>
        </div>
      </div>
    </div>
  );
}
