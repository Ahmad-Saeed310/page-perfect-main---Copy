import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, FolderOpen, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface SavedDesign {
  id: string;
  name: string;
  timestamp: number;
  data: {
    paperSizeId: string;
    templateId: string;
    orientation: string;
    lineColor: string;
    pageColor: string;
    lineGap: number;
    notepadText: string;
    textElements: any[];
    images: any[];
  };
}

interface SaveLoadDesignProps {
  currentDesign: SavedDesign['data'];
  onLoad: (design: SavedDesign['data']) => void;
}

const STORAGE_KEY = 'allprintablepages-designs';

export function SaveLoadDesign({ currentDesign, onLoad }: SaveLoadDesignProps) {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [saveName, setSaveName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadDesigns();
  }, []);

  const loadDesigns = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setDesigns(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load designs:', e);
    }
  };

  const saveDesigns = (newDesigns: SavedDesign[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDesigns));
      setDesigns(newDesigns);
    } catch (e) {
      console.error('Failed to save designs:', e);
      toast.error('Failed to save design');
    }
  };

  const handleSave = () => {
    if (!saveName.trim()) {
      toast.error('Please enter a name for your design');
      return;
    }

    const newDesign: SavedDesign = {
      id: `design-${Date.now()}`,
      name: saveName.trim(),
      timestamp: Date.now(),
      data: { ...currentDesign },
    };

    saveDesigns([newDesign, ...designs].slice(0, 20)); // Keep max 20 designs
    setSaveName('');
    toast.success('Design saved!');
  };

  const handleLoad = (design: SavedDesign) => {
    onLoad(design.data);
    setIsOpen(false);
    toast.success(`Loaded "${design.name}"`);
  };

  const handleDelete = (id: string) => {
    saveDesigns(designs.filter((d) => d.id !== id));
    toast.success('Design deleted');
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(currentDesign, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Design exported as JSON');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        onLoad(data);
        toast.success('Design imported successfully');
        setIsOpen(false);
      } catch (err) {
        toast.error('Invalid design file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="control-section space-y-3">
      <label className="control-label">Save & Load</label>
      
      <div className="flex gap-2">
        <Input
          placeholder="Design name..."
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          className="flex-1 h-9 text-sm"
          maxLength={30}
        />
        <Button size="sm" onClick={handleSave} className="h-9 px-3">
          <Save className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full gap-2">
            <FolderOpen className="w-4 h-4" />
            Load Design ({designs.length})
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Saved Designs</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-2 mb-3">
            <Button variant="outline" size="sm" onClick={handleExportJSON} className="flex-1 gap-1">
              <Download className="w-3 h-3" />
              Export Current
            </Button>
            <Button variant="outline" size="sm" asChild className="flex-1 gap-1">
              <label className="cursor-pointer">
                <FolderOpen className="w-3 h-3" />
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </Button>
          </div>

          <ScrollArea className="h-[300px] pr-3">
            {designs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No saved designs yet. Save your first design above!
              </p>
            ) : (
              <div className="space-y-2">
                {designs.map((design) => (
                  <div
                    key={design.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <button
                      onClick={() => handleLoad(design)}
                      className="flex-1 text-left"
                    >
                      <p className="font-medium text-sm truncate">{design.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {design.data.templateId} • {design.data.paperSizeId} • {formatDate(design.timestamp)}
                      </p>
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(design.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
