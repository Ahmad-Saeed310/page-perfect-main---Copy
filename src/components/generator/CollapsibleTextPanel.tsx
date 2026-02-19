import { useState } from 'react';
import { TextElement } from '@/lib/canvasTypes';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Trash2, Type, Bold, Italic, ChevronDown, ChevronUp, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleTextPanelProps {
  textElements: TextElement[];
  onTextElementsChange: (elements: TextElement[]) => void;
}

export function CollapsibleTextPanel({
  textElements,
  onTextElementsChange,
}: CollapsibleTextPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteText = (id: string) => {
    onTextElementsChange(textElements.filter((el) => el.id !== id));
  };

  const handleDeleteAll = () => {
    onTextElementsChange([]);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newElements = [...textElements];
    [newElements[index - 1], newElements[index]] = [newElements[index], newElements[index - 1]];
    onTextElementsChange(newElements);
  };

  const handleMoveDown = (index: number) => {
    if (index === textElements.length - 1) return;
    const newElements = [...textElements];
    [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
    onTextElementsChange(newElements);
  };

  if (textElements.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-border/50 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full h-auto py-3 px-4 justify-between rounded-none hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Text Elements</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {textElements.length}
              </span>
            </div>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="border-t border-border/30">
            {/* Clear All Button */}
            {textElements.length > 1 && (
              <div className="px-3 py-2 border-b border-border/30 bg-muted/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeleteAll}
                  className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 w-full justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Clear All Text
                </Button>
              </div>
            )}

            {/* Elements List */}
            <ScrollArea className="max-h-[240px]">
              <div className="p-2 space-y-1.5">
                {textElements.map((element, index) => (
                  <div
                    key={element.id}
                    className="group flex items-center gap-1.5 p-2 rounded-lg bg-background/50 border border-border/30 hover:border-border/50 transition-all duration-200"
                  >
                    {/* Reorder Controls */}
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === textElements.length - 1}
                        className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Layer Number */}
                    <div className="flex items-center justify-center w-5 h-5 rounded bg-muted text-muted-foreground shrink-0">
                      <span className="text-[10px] font-medium">{index + 1}</span>
                    </div>

                    {/* Text Preview */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm truncate leading-tight",
                          element.bold && "font-bold",
                          element.italic && "italic"
                        )}
                        style={{ color: element.color }}
                      >
                        {element.text || 'Empty text'}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">
                          {Math.round(element.fontSize)}px
                        </span>
                        {element.bold && (
                          <Bold className="w-2.5 h-2.5 text-muted-foreground" />
                        )}
                        {element.italic && (
                          <Italic className="w-2.5 h-2.5 text-muted-foreground" />
                        )}
                        <div 
                          className="w-2.5 h-2.5 rounded-full border border-border/50" 
                          style={{ backgroundColor: element.color }}
                        />
                      </div>
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteText(element.id)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-60 hover:opacity-100 transition-opacity shrink-0"
                      title="Delete text element"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Hint */}
            <div className="px-3 py-2 border-t border-border/30 bg-muted/10">
              <p className="text-[10px] text-muted-foreground text-center">
                Use arrows to reorder layers • Higher = rendered on top
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
