import { useEffect, useRef, useCallback, useState } from 'react';
import { PaperSize, getCanvasDimensions, Orientation } from '@/lib/paperSizes';
import { TemplateConfig } from '@/lib/templates';
import { renderTemplate, renderWatermark } from '@/lib/canvasRenderer';
import { TextElement, CanvasImageData } from '@/lib/canvasTypes';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Plus, Minus, Undo2, Redo2, Type, MousePointer2, Move, Trash2, Minimize2, Maximize2, ZoomIn, ZoomOut, Expand, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileFabMenu } from './MobileFabMenu';
import { useIsMobile } from '@/hooks/use-mobile';

type CanvasTool = 'select' | 'text' | 'move';

interface CanvasPreviewProps {
  paperSize: PaperSize;
  templateId: string;
  config: TemplateConfig;
  orientation: Orientation;
  notepadText?: string;
  textElements: TextElement[];
  onTextElementsChange: (elements: TextElement[]) => void;
  images: CanvasImageData[];
  onImagesChange: (images: CanvasImageData[]) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const RESIZE_HANDLE_SIZE = 10;
const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const TEXT_COLORS = [
  '#1a1a1a', '#374151', '#1e40af', '#047857', '#b91c1c', '#7c3aed', '#c2410c'
];

const TOOL_CONFIG = {
  select: { icon: MousePointer2, label: 'Select', cursor: 'default' },
  text: { icon: Type, label: 'Text', cursor: 'text' },
  move: { icon: Move, label: 'Move', cursor: 'move' },
};

export function CanvasPreview({
  paperSize,
  templateId,
  config,
  orientation,
  notepadText,
  textElements,
  onTextElementsChange,
  images,
  onImagesChange,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<CanvasTool>('select');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const [draggingImage, setDraggingImage] = useState<string | null>(null);
  const [resizingImage, setResizingImage] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [isToolbarCompact, setIsToolbarCompact] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const loadedImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const isMobile = useIsMobile();

  const { width, height, scale } = getCanvasDimensions(paperSize, orientation);

  const handleZoomIn = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoom);
    if (currentIndex < ZOOM_LEVELS.length - 1) {
      setZoom(ZOOM_LEVELS[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoom);
    if (currentIndex > 0) {
      setZoom(ZOOM_LEVELS[currentIndex - 1]);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Close fullscreen on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Load images
  useEffect(() => {
    images.forEach((img) => {
      if (!loadedImagesRef.current.has(img.id)) {
        const imgEl = new Image();
        imgEl.onload = () => {
          loadedImagesRef.current.set(img.id, imgEl);
          render();
        };
        imgEl.src = img.src;
      }
    });
    const imageIds = new Set(images.map((img) => img.id));
    loadedImagesRef.current.forEach((_, key) => {
      if (!imageIds.has(key)) {
        loadedImagesRef.current.delete(key);
      }
    });
  }, [images]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dims = getCanvasDimensions(paperSize, orientation);
    canvas.width = dims.width;
    canvas.height = dims.height;

    renderTemplate(ctx, canvas, {
      paperSize,
      config,
      templateId,
      scale: dims.scale,
      notepadText,
      orientation,
    });

    // Render images with resize handles
    images.forEach((img) => {
      const imgEl = loadedImagesRef.current.get(img.id);
      if (imgEl) {
        ctx.drawImage(imgEl, img.x, img.y, img.width, img.height);
        
        ctx.fillStyle = 'hsl(var(--primary))';
        ctx.fillRect(
          img.x + img.width - RESIZE_HANDLE_SIZE,
          img.y + img.height - RESIZE_HANDLE_SIZE,
          RESIZE_HANDLE_SIZE,
          RESIZE_HANDLE_SIZE
        );
      }
    });

    // Render text elements
    textElements.forEach((el) => {
      if (el.id !== editingId) {
        const fontStyle = `${el.italic ? 'italic ' : ''}${el.bold ? 'bold ' : ''}`;
        ctx.font = `${fontStyle}${el.fontSize}px 'Inter', system-ui, sans-serif`;
        ctx.fillStyle = el.color || '#1a1a1a';
        ctx.textBaseline = 'top';
        ctx.fillText(el.text, el.x, el.y);
        
        if (el.id === selectedTextId) {
          const metrics = ctx.measureText(el.text || 'Text');
          ctx.strokeStyle = 'hsl(var(--primary))';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(el.x - 4, el.y - 4, metrics.width + 8, el.fontSize + 8);
          ctx.setLineDash([]);
        }
      }
    });

    // Render watermark
    renderWatermark(ctx, canvas, dims.scale);
  }, [paperSize, templateId, config, orientation, notepadText, textElements, editingId, images, selectedTextId]);

  useEffect(() => {
    render();
  }, [render]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggingImage || resizingImage) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getCanvasCoords(e);
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    // Check if clicking on existing text
    if (ctx) {
      for (const el of textElements) {
        const fontStyle = `${el.italic ? 'italic ' : ''}${el.bold ? 'bold ' : ''}`;
        ctx.font = `${fontStyle}${el.fontSize}px 'Inter', system-ui, sans-serif`;
        const metrics = ctx.measureText(el.text || 'Click to type');
        if (
          x >= el.x &&
          x <= el.x + metrics.width &&
          y >= el.y &&
          y <= el.y + el.fontSize
        ) {
          setSelectedTextId(el.id);
          if (activeTool === 'select' || activeTool === 'text') {
            setEditingId(el.id);
            setEditingText(el.text);
            setInputPosition({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          }
          return;
        }
      }
    }

    setSelectedTextId(null);

    // Only add new text if text tool is active
    if (activeTool !== 'text') return;

    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      text: '',
      x,
      y,
      fontSize: 16 * (canvas.width / rect.width),
      bold: false,
      italic: false,
      color: '#1a1a1a',
    };

    onTextElementsChange([...textElements, newElement]);
    setEditingId(newElement.id);
    setSelectedTextId(newElement.id);
    setEditingText('');
    setInputPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleInputBlur = () => {
    if (editingId) {
      if (editingText.trim()) {
        onTextElementsChange(
          textElements.map((el) =>
            el.id === editingId ? { ...el, text: editingText } : el
          )
        );
      } else {
        onTextElementsChange(textElements.filter((el) => el.id !== editingId));
        setSelectedTextId(null);
      }
      setEditingId(null);
      setEditingText('');
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditingText('');
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'select' && activeTool !== 'move') return;
    
    const { x, y } = getCanvasCoords(e);

    for (let i = images.length - 1; i >= 0; i--) {
      const img = images[i];
      const handleX = img.x + img.width - RESIZE_HANDLE_SIZE;
      const handleY = img.y + img.height - RESIZE_HANDLE_SIZE;
      
      if (x >= handleX && x <= handleX + RESIZE_HANDLE_SIZE &&
          y >= handleY && y <= handleY + RESIZE_HANDLE_SIZE) {
        setResizingImage(img.id);
        e.preventDefault();
        return;
      }
    }

    for (let i = images.length - 1; i >= 0; i--) {
      const img = images[i];
      if (
        x >= img.x &&
        x <= img.x + img.width &&
        y >= img.y &&
        y <= img.y + img.height
      ) {
        setDraggingImage(img.id);
        setDragOffset({ x: x - img.x, y: y - img.y });
        e.preventDefault();
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);

    if (resizingImage) {
      onImagesChange(
        images.map((img) => {
          if (img.id === resizingImage) {
            const newWidth = Math.max(30, x - img.x);
            const newHeight = Math.max(30, y - img.y);
            return { ...img, width: newWidth, height: newHeight };
          }
          return img;
        })
      );
      return;
    }

    if (draggingImage) {
      onImagesChange(
        images.map((img) =>
          img.id === draggingImage
            ? { ...img, x: x - dragOffset.x, y: y - dragOffset.y }
            : img
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingImage(null);
    setResizingImage(null);
  };

  const toggleBold = () => {
    if (!selectedTextId) return;
    onTextElementsChange(
      textElements.map((el) =>
        el.id === selectedTextId ? { ...el, bold: !el.bold } : el
      )
    );
  };

  const toggleItalic = () => {
    if (!selectedTextId) return;
    onTextElementsChange(
      textElements.map((el) =>
        el.id === selectedTextId ? { ...el, italic: !el.italic } : el
      )
    );
  };

  const changeFontSize = (delta: number) => {
    if (!selectedTextId) return;
    onTextElementsChange(
      textElements.map((el) =>
        el.id === selectedTextId
          ? { ...el, fontSize: Math.max(8, Math.min(72, el.fontSize + delta)) }
          : el
      )
    );
  };

  const changeColor = (color: string) => {
    if (!selectedTextId) return;
    onTextElementsChange(
      textElements.map((el) =>
        el.id === selectedTextId ? { ...el, color } : el
      )
    );
  };

  const selectedText = textElements.find((el) => el.id === selectedTextId);
  const currentCursor = TOOL_CONFIG[activeTool].cursor;

  const handleDeleteText = (id: string) => {
    onTextElementsChange(textElements.filter((el) => el.id !== id));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
  };

  const handleDeleteAllText = () => {
    onTextElementsChange([]);
    setSelectedTextId(null);
  };

  // Canvas content component to avoid duplication
  const canvasContent = (
    <div 
      className="relative rounded-lg overflow-hidden shadow-xl border border-border/30"
      style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="paper-canvas"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          cursor: currentCursor,
        }}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {editingId && (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autoFocus
          className="absolute bg-white/90 backdrop-blur-sm border border-primary/30 rounded px-2 py-1 outline-none ring-2 ring-primary/20 text-foreground shadow-lg"
          style={{
            left: `${inputPosition.x}px`,
            top: `${inputPosition.y}px`,
            fontSize: '16px',
            fontFamily: "'Inter', system-ui, sans-serif",
            minWidth: '120px',
          }}
          placeholder="Type here..."
        />
      )}

      {/* Floating Zoom Controls - Top Right */}
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-card/90 backdrop-blur-lg rounded-lg p-0.5 border border-border/50 shadow-sm">
        <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoom <= 0.5} className="h-6 w-6 p-0">
          <ZoomOut className="w-3 h-3" />
        </Button>
        <span className="text-[9px] font-medium w-7 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
        <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoom >= 2} className="h-6 w-6 p-0">
          <ZoomIn className="w-3 h-3" />
        </Button>
        <div className="w-px h-4 bg-border/50" />
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleFullscreen} 
          className="h-6 w-6 p-0"
          title="Fullscreen"
        >
          <Expand className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );

  // Fullscreen overlay
  if (isFullscreen) {
    return (
      <div 
        ref={fullscreenRef}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
      >
        {/* Fullscreen Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-card/80 backdrop-blur-lg rounded-lg p-1 border border-border/50">
            <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoom <= 0.5} className="h-7 w-7 p-0">
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <span className="text-xs font-medium w-10 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoom >= 2} className="h-7 w-7 p-0">
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="h-8 w-8 p-0 bg-card/80 backdrop-blur-lg border border-border/50">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Fullscreen Canvas */}
        <div className="overflow-auto max-h-[80vh] max-w-full">
          {canvasContent}
        </div>

        {/* Fullscreen Toolbar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 bg-card/80 backdrop-blur-lg rounded-lg p-1 border border-border/50">
            {(Object.keys(TOOL_CONFIG) as CanvasTool[]).map((tool) => {
              const { icon: Icon, label } = TOOL_CONFIG[tool];
              return (
                <Button
                  key={tool}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTool(tool)}
                  className={cn(
                    "h-8 w-8 p-0",
                    activeTool === tool && "bg-primary text-primary-foreground"
                  )}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              );
            })}
            <div className="w-px h-6 bg-border mx-1" />
            <Button variant="ghost" size="sm" onClick={onUndo} disabled={!canUndo} className="h-8 w-8 p-0">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onRedo} disabled={!canRedo} className="h-8 w-8 p-0">
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="canvas-container mt-4 bg-primary relative flex flex-col items-center pb-20 md:pb-0">
      {/* Canvas with zoom */}
      <div className="overflow-auto max-w-full" style={{ maxHeight: isMobile ? '60vh' : '70vh' }}>
        {canvasContent}
      </div>

      {/* Compact Tool Hint */}
      <div className="mt-2 flex items-center justify-center">
        <div className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium",
          activeTool === 'text' 
            ? "bg-primary/10 text-primary border border-primary/20" 
            : "bg-muted/50 text-muted-foreground"
        )}>
          {activeTool === 'text' && <Type className="w-3 h-3 shrink-0" />}
          <span>
            {activeTool === 'text' 
              ? "Tap to add" 
              : activeTool === 'select'
              ? "Tap to select"
              : "Drag to move"}
          </span>
        </div>
      </div>

      {/* Desktop Toolbar - Hidden on mobile */}
      <div className="hidden md:block mt-2">
        <div className={cn(
          "bg-card/80 backdrop-blur-lg border border-border/50 rounded-xl shadow-lg transition-all duration-300",
          isToolbarCompact ? "p-1" : "p-2"
        )}>
          <div className="flex items-center gap-1">
            {/* Compact Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsToolbarCompact(!isToolbarCompact)}
              className="h-7 w-7 p-0 shrink-0"
              title={isToolbarCompact ? "Expand" : "Compact"}
            >
              {isToolbarCompact ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </Button>

            <div className="w-px h-5 bg-border" />

            {/* Tool Selection */}
            <div className="flex items-center gap-0.5 p-0.5 bg-muted/50 rounded-md">
              {(Object.keys(TOOL_CONFIG) as CanvasTool[]).map((tool) => {
                const { icon: Icon, label } = TOOL_CONFIG[tool];
                return (
                  <Button
                    key={tool}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTool(tool)}
                    className={cn(
                      "h-7 px-1.5 gap-1 transition-all duration-200",
                      activeTool === tool 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "hover:bg-muted"
                    )}
                    title={label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {!isToolbarCompact && <span className="text-[10px] font-medium">{label}</span>}
                  </Button>
                );
              })}
            </div>

            <div className="w-px h-5 bg-border" />

            {/* History */}
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="sm" onClick={onUndo} disabled={!canUndo} className="h-7 w-7 p-0" title="Undo">
                <Undo2 className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onRedo} disabled={!canRedo} className="h-7 w-7 p-0" title="Redo">
                <Redo2 className="w-3.5 h-3.5" />
              </Button>
              {selectedTextId && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteText(selectedTextId)}
                  className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* Expanded Formatting */}
          {!isToolbarCompact && selectedTextId && selectedText && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1.5 mt-1.5 border-t border-border/50 animate-fade-in">
              <Button
                variant={selectedText.bold ? 'default' : 'ghost'}
                size="sm"
                onClick={toggleBold}
                className="h-7 w-7 p-0"
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant={selectedText.italic ? 'default' : 'ghost'}
                size="sm"
                onClick={toggleItalic}
                className="h-7 w-7 p-0"
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </Button>
              
              <div className="flex items-center gap-0.5 bg-muted/50 rounded p-0.5">
                <Button variant="ghost" size="sm" onClick={() => changeFontSize(-2)} className="h-6 w-6 p-0">
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-[10px] font-medium w-6 text-center tabular-nums">
                  {Math.round(selectedText.fontSize)}
                </span>
                <Button variant="ghost" size="sm" onClick={() => changeFontSize(2)} className="h-6 w-6 p-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex gap-0.5 ml-1">
                {TEXT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => changeColor(color)}
                    className={cn(
                      "w-5 h-5 rounded-full transition-all duration-200 hover:scale-110",
                      selectedText.color === color 
                        ? "ring-2 ring-primary ring-offset-1 ring-offset-background scale-110" 
                        : "hover:ring-1 hover:ring-muted-foreground/30"
                    )}
                    style={{ backgroundColor: color }}
                    title={`Color: ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile FAB Menu */}
      {isMobile && (
        <MobileFabMenu
          activeTool={activeTool}
          onToolChange={setActiveTool}
          onUndo={onUndo}
          onRedo={onRedo}
          canUndo={canUndo}
          canRedo={canRedo}
          selectedTextId={selectedTextId}
          selectedText={selectedText}
          onToggleBold={toggleBold}
          onToggleItalic={toggleItalic}
          onChangeFontSize={changeFontSize}
          onChangeColor={changeColor}
          onDeleteText={() => selectedTextId && handleDeleteText(selectedTextId)}
        />
      )}
    </div>
  );
}
