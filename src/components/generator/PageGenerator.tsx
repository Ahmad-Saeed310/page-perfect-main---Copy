import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { PAPER_SIZES, PaperSize, Orientation, getEffectiveDimensions } from '@/lib/paperSizes';
import { TEMPLATES, Template } from '@/lib/templateCategories';
import { DEFAULT_CONFIGS, TemplateConfig, getTemplateConfig } from '@/lib/templateConfigs';
import { TextElement, CanvasImageData } from '@/lib/canvasTypes';
import { PageSizeSelector } from './PageSizeSelector';
import { TemplateBrowser } from './TemplateBrowser';
import { CanvasPreview } from './CanvasPreview';
import { ExpandableNotepad } from './ExpandableNotepad';
import { ExportControls } from './ExportControls';
import { CustomizationPanel } from './CustomizationPanel';
import { ImageUploader } from './ImageUploader';
import { OrientationToggle } from './OrientationToggle';
import { FooterLink } from './FooterLink';
import { FocusMode } from './FocusMode';
import { SaveLoadDesign, SavedDesign } from './SaveLoadDesign';
import { CollapsibleTextPanel } from './CollapsibleTextPanel';
import { Button } from '@/components/ui/button';
import { FileText, PenLine, ChevronDown, ChevronUp, LayoutList } from 'lucide-react';

import GoogleAd from "../ads/ad.jsx"

export function PageGenerator() {
  const [paperSize, setPaperSize] = useState<PaperSize>(
    PAPER_SIZES.find((s) => s.id === 'a4')!
  );
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [template, setTemplate] = useState<Template>(
    TEMPLATES.find((t) => t.id === 'lined')!
  );
  const [notepadText, setNotepadText] = useState('');
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [images, setImages] = useState<CanvasImageData[]>([]);
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [showTemplateBrowser, setShowTemplateBrowser] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  
  // Undo/Redo state
  const historyRef = useRef<{ textElements: TextElement[]; images: CanvasImageData[] }[]>([]);
  const currentIndexRef = useRef(-1);
  const isUpdatingRef = useRef(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Save state to history
  const saveState = useCallback(() => {
    if (isUpdatingRef.current) return;
    
    const newState = {
      textElements: JSON.parse(JSON.stringify(textElements)),
      images: JSON.parse(JSON.stringify(images)),
    };
    
    historyRef.current = historyRef.current.slice(0, currentIndexRef.current + 1);
    historyRef.current.push(newState);
    
    if (historyRef.current.length > 50) {
      historyRef.current.shift();
    } else {
      currentIndexRef.current++;
    }
    
    setCanUndo(currentIndexRef.current > 0);
    setCanRedo(false);
  }, [textElements, images]);

  // Save initial state
  useEffect(() => {
    if (historyRef.current.length === 0) {
      saveState();
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isUpdatingRef.current && historyRef.current.length > 0) {
        saveState();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [textElements, images]);

  const handleUndo = useCallback(() => {
    if (currentIndexRef.current <= 0) return;
    
    currentIndexRef.current--;
    const state = historyRef.current[currentIndexRef.current];
    
    isUpdatingRef.current = true;
    setTextElements(state.textElements);
    setImages(state.images);
    setTimeout(() => { isUpdatingRef.current = false; }, 100);
    
    setCanUndo(currentIndexRef.current > 0);
    setCanRedo(true);
  }, []);

  const handleRedo = useCallback(() => {
    if (currentIndexRef.current >= historyRef.current.length - 1) return;
    
    currentIndexRef.current++;
    const state = historyRef.current[currentIndexRef.current];
    
    isUpdatingRef.current = true;
    setTextElements(state.textElements);
    setImages(state.images);
    setTimeout(() => { isUpdatingRef.current = false; }, 100);
    
    setCanUndo(true);
    setCanRedo(currentIndexRef.current < historyRef.current.length - 1);
  }, []);

  // Customization state
  const [lineColor, setLineColor] = useState(getTemplateConfig(template.id).lineColor);
  const [pageColor, setPageColor] = useState(getTemplateConfig(template.id).pageColor);
  const [lineGap, setLineGap] = useState(
    getTemplateConfig(template.id).lineSpacing || getTemplateConfig(template.id).gridSize || 5
  );

  const config: TemplateConfig = useMemo(() => {
    const baseConfig = getTemplateConfig(template.id);
    return {
      ...baseConfig,
      lineColor,
      pageColor,
      lineSpacing: baseConfig.lineSpacing > 0 ? lineGap : 0,
      gridSize: baseConfig.gridSize > 0 ? lineGap : 0,
    };
  }, [template.id, lineColor, pageColor, lineGap]);

  const effectiveDims = useMemo(() => 
    getEffectiveDimensions(paperSize, orientation),
    [paperSize, orientation]
  );

  const handlePaperSizeChange = useCallback((size: PaperSize) => {
    setPaperSize(size);
  }, []);

  const handleTemplateChange = useCallback((t: Template) => {
    setTemplate(t);
    const defaults = getTemplateConfig(t.id);
    setLineColor(defaults.lineColor);
    setPageColor(defaults.pageColor);
    setLineGap(defaults.lineSpacing || defaults.gridSize || 5);
  }, []);

  const handleLoadDesign = useCallback((data: SavedDesign['data']) => {
    const loadedPaperSize = PAPER_SIZES.find(s => s.id === data.paperSizeId);
    const loadedTemplate = TEMPLATES.find(t => t.id === data.templateId);
    
    if (loadedPaperSize) setPaperSize(loadedPaperSize);
    if (loadedTemplate) setTemplate(loadedTemplate);
    if (data.orientation) setOrientation(data.orientation as Orientation);
    if (data.lineColor) setLineColor(data.lineColor);
    if (data.pageColor) setPageColor(data.pageColor);
    if (data.lineGap) setLineGap(data.lineGap);
    if (data.notepadText !== undefined) setNotepadText(data.notepadText);
    if (data.textElements) setTextElements(data.textElements);
    if (data.images) setImages(data.images);
  }, []);

  const currentDesign: SavedDesign['data'] = useMemo(() => ({
    paperSizeId: paperSize.id,
    templateId: template.id,
    orientation,
    lineColor,
    pageColor,
    lineGap,
    notepadText,
    textElements,
    images,
  }), [paperSize.id, template.id, orientation, lineColor, pageColor, lineGap, notepadText, textElements, images]);

  return (
    <div className="min-h-screen bg-red-100 flex flex-col ">
      {/* Template Browser Sidebar */}
      <TemplateBrowser
        value={template.id}
        onChange={handleTemplateChange}
        isOpen={showTemplateBrowser}
        onToggle={() => setShowTemplateBrowser(!showTemplateBrowser)}
      />

      {/* Header - Compact on mobile */}
      <header className="bg-card border-b border-border shadow-toolbar sticky top-0 z-10 bg-red-300">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplateBrowser(!showTemplateBrowser)}
              className="gap-1.5 h-8 px-2"
            >
              <LayoutList className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Templates</span>
            </Button>
            <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              <h1 className="text-sm sm:text-lg font-semibold text-foreground">
                Page Generator
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFocusMode(true)}
              className="gap-1.5 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/30 hover:from-primary/10 hover:to-primary/20"
            >
              <PenLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="hidden xs:inline text-xs sm:text-sm font-medium">Focus Mode</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex-1 bg-red-600">
        {/* Mobile: Page preview on top */}
        <div className="flex flex-col gap-3 sm:gap-4 bg-red-900">
          {/* Canvas Preview - Always visible at top on mobile, side on desktop */}
          <div className="lg:hidden">
            <div className="bg-card rounded-lg sm:rounded-xl border border-border p-2 sm:p-3 mb-2 sm:mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium text-foreground text-xs sm:text-sm">
                    {template.name}
                  </h2>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {paperSize.name} • {effectiveDims.width} × {effectiveDims.height} mm
                  </p>
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground bg-secondary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  Live
                </div>
              </div>
            </div>

<div id="ad" className="w-full my-6">
  <GoogleAd />
</div>

            <CanvasPreview
              paperSize={paperSize}
              templateId={template.id}
              config={config}
              orientation={orientation}
              notepadText={notepadText}
              textElements={textElements}
              onTextElementsChange={setTextElements}
              images={images}
              onImagesChange={setImages}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={canUndo}
              canRedo={canRedo}
              bg-color="bg-yellow-300"
            />

            {/* Collapsible Options on mobile */}
            <Button
              variant="outline"
              className="w-full mt-3 sm:mt-4 gap-2 h-10"
              onClick={() => setShowOptions(!showOptions)}
            >
              {showOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showOptions ? 'Hide Options' : 'Show Options'}
            </Button>
          </div>

          {/* Desktop layout: Side by side */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_340px] gap-6 bg-green-100">
            {/* Canvas Preview Area - Left side on desktop */}
            <main className="flex flex-col bg-green-200">
              <div className="bg-card rounded-xl border border-border p-4 mb-4 bg-green-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-medium text-foreground">
                      {template.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {paperSize.name} ({orientation}) • {effectiveDims.width} × {effectiveDims.height} mm
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    Live Preview
                  </div>
                </div>
              </div>

{/* <div id="ad" className="bg-yellow-600 h-[50vh] w-full">
  */}
{/*  
  <div id="adContent" className="bg-white h-full w-full flex items-center justify-center font-medium text-[4vh]">Digital Linear</div> */}

<div id="ad" className="w-full my-6">
  <GoogleAd />
</div>
{/* </div> */}

              <CanvasPreview
                paperSize={paperSize}
                templateId={template.id}
                config={config}
                orientation={orientation}
                notepadText={notepadText}
                textElements={textElements}
                onTextElementsChange={setTextElements}
                images={images}
                onImagesChange={setImages}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={canUndo}
                canRedo={canRedo}
                bg-color="bg-green-300"
              />
            </main>

            {/* Sidebar Controls - Right side on desktop */}
            <aside className="bg-card rounded-xl border border-border p-5 h-fit sticky top-20 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto bg-green-300">
              <SaveLoadDesign currentDesign={currentDesign} onLoad={handleLoadDesign} />

              <PageSizeSelector
                value={paperSize.id}
                onChange={handlePaperSizeChange}
              />

              <OrientationToggle value={orientation} onChange={setOrientation} />

              {/* Template selection moved to sidebar browser */}

              <CustomizationPanel
                templateId={template.id}
                lineColor={lineColor}
                pageColor={pageColor}
                lineGap={lineGap}
                onLineColorChange={setLineColor}
                onPageColorChange={setPageColor}
                onLineGapChange={setLineGap}
              />

              <CollapsibleTextPanel 
                textElements={textElements} 
                onTextElementsChange={setTextElements} 
              />

              <ExpandableNotepad value={notepadText} onChange={setNotepadText} />

              <ExportControls
                paperSize={paperSize}
                templateId={template.id}
                config={config}
                notepadText={notepadText}
                textElements={textElements}
                images={images}
                orientation={orientation}
              />

              <ImageUploader images={images} onImagesChange={setImages} />
            </aside>
          </div>

          {/* Mobile Options Panel */}
          {showOptions && (
            <div className="lg:hidden bg-card rounded-lg sm:rounded-xl border border-border p-3 sm:p-4 space-y-3 sm:space-y-4 ">
              <SaveLoadDesign currentDesign={currentDesign} onLoad={handleLoadDesign} />

              <PageSizeSelector
                value={paperSize.id}
                onChange={handlePaperSizeChange}
              />

              <OrientationToggle value={orientation} onChange={setOrientation} />

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => setShowTemplateBrowser(true)}
              >
                <LayoutList className="w-4 h-4" />
                Browse Templates ({template.name})
              </Button>

              <CustomizationPanel
                templateId={template.id}
                lineColor={lineColor}
                pageColor={pageColor}
                lineGap={lineGap}
                onLineColorChange={setLineColor}
                onPageColorChange={setPageColor}
                onLineGapChange={setLineGap}
              />

              <CollapsibleTextPanel 
                textElements={textElements} 
                onTextElementsChange={setTextElements} 
              />

              <ExpandableNotepad value={notepadText} onChange={setNotepadText} />

              <ExportControls
                paperSize={paperSize}
                templateId={template.id}
                config={config}
                notepadText={notepadText}
                textElements={textElements}
                images={images}
                orientation={orientation}
              />

              <ImageUploader images={images} onImagesChange={setImages} />
            </div>
          )}
        </div>
      </div>

      <FooterLink />
      <FocusMode isOpen={showFocusMode} onClose={() => setShowFocusMode(false)} />
    </div>
  );
}
