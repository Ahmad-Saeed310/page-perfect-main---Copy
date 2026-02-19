import { useState, useMemo } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES, Template, searchTemplates, getTemplatesByCategory } from '@/lib/templateCategories';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { TemplatePreview } from './TemplatePreview';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
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
  Triangle,
  CircleDot,
  TrendingUp,
  Target,
  Wallet,
  List,
  CalendarDays,
  GraduationCap,
  Gamepad2,
  Trophy,
  Scissors,
  Tag,
  Layout,
  ChevronLeft,
  ChevronRight,
  X,
  Octagon,
  Pentagon,
  Move3D,
  Guitar,
  Palette,
  Network,
  Layers,
  Columns2,
  Columns3,
  Table,
  CalendarRange,
  CheckSquare,
  Utensils,
  Apple,
  Dumbbell,
  GanttChart,
  CreditCard,
  Receipt,
  PiggyBank,
  ListChecks,
  ShoppingCart,
  Luggage,
  Star,
  Contact,
  Package,
  CalendarClock,
  Clock,
  Users,
  FileText,
  ClipboardList,
  FileQuestion,
  Hash,
  Route,
  Circle,
  Diamond,
  RectangleHorizontal,
  GitBranch,
  Flag,
  Mail,
  Badge,
  BookCopy,
  Monitor,
  Smartphone,
  Crosshair,
  User,
  StickyNote,
  PenLine,
  AlignJustify,
  ChartLine,
  ChartSpline,
  LayoutPanelLeft,
  ListTree,
  Cylinder,
  SpellCheck,
} from 'lucide-react';

interface TemplateBrowserProps {
  value: string;
  onChange: (template: Template) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'file': File,
  'square': Square,
  'layout-grid': LayoutGrid,
  'book-open': BookOpen,
  'align-left': AlignLeft,
  'grid-3x3': Grid3X3,
  'grip': Grip,
  'music': Music,
  'ruler': Ruler,
  'notebook': NotebookPen,
  'notebook-pen': NotebookPen,
  'calendar': Calendar,
  'pen-tool': PenTool,
  'box': Box,
  'hexagon': Hexagon,
  'film': Film,
  'triangle': Triangle,
  'circle-dot': CircleDot,
  'trending-up': TrendingUp,
  'chart-line': ChartLine,
  'chart-spline': ChartSpline,
  'move-3d': Move3D,
  'target': Target,
  'wallet': Wallet,
  'list': List,
  'calendar-days': CalendarDays,
  'graduation-cap': GraduationCap,
  'gamepad-2': Gamepad2,
  'trophy': Trophy,
  'scissors': Scissors,
  'tag': Tag,
  'layout': Layout,
  'octagon': Octagon,
  'pentagon': Pentagon,
  'guitar': Guitar,
  'piano': Music,
  'palette': Palette,
  'layout-panel-left': LayoutPanelLeft,
  'list-tree': ListTree,
  'network': Network,
  'layers': Layers,
  'columns-2': Columns2,
  'columns-3': Columns3,
  'table': Table,
  'calendar-range': CalendarRange,
  'check-square': CheckSquare,
  'utensils': Utensils,
  'apple': Apple,
  'dumbbell': Dumbbell,
  'gantt-chart': GanttChart,
  'credit-card': CreditCard,
  'receipt': Receipt,
  'piggy-bank': PiggyBank,
  'trending-down': TrendingUp,
  'file-text': FileText,
  'book': BookOpen,
  'list-checks': ListChecks,
  'shopping-cart': ShoppingCart,
  'luggage': Luggage,
  'star': Star,
  'contact': Contact,
  'package': Package,
  'calendar-clock': CalendarClock,
  'clock': Clock,
  'users': Users,
  'clipboard-list': ClipboardList,
  'file-question': FileQuestion,
  'spell-check': SpellCheck,
  'search': Search,
  'hash': Hash,
  'route': Route,
  'circle': Circle,
  'diamond': Diamond,
  'rectangle-horizontal': RectangleHorizontal,
  'git-branch': GitBranch,
  'flag': Flag,
  'mail': Mail,
  'badge': Badge,
  'book-copy': BookCopy,
  'monitor': Monitor,
  'smartphone': Smartphone,
  'cylinder': Cylinder,
  'semicircle': Circle,
  'crosshair': Crosshair,
  'user': User,
  'sticky-note': StickyNote,
  'pen-line': PenLine,
  'align-justify': AlignJustify,
  'grid-2x2': Grid3X3,
  'axis-3d': Move3D,
};

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'basic': File,
  'graph': Grid3X3,
  'specialty-graph': Triangle,
  'music-art': Music,
  'notes-study': BookOpen,
  'planners': Calendar,
  'budgets': Wallet,
  'lists': List,
  'calendars': CalendarDays,
  'teacher': GraduationCap,
  'games': Gamepad2,
  'sports': Trophy,
  'crafts': Scissors,
  'cards-tags': Tag,
  'marketing': Layout,
  '3d-technical': Box,
  'targets': Target,
};

export function TemplateBrowser({ value, onChange, isOpen, onToggle }: TemplateBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTemplates = useMemo(() => {
    let results = searchQuery ? searchTemplates(searchQuery) : TEMPLATES;
    if (selectedCategory !== 'all') {
      results = results.filter(t => t.category === selectedCategory);
    }
    return results;
  }, [searchQuery, selectedCategory]);

  const groupedTemplates = useMemo(() => {
    if (searchQuery || selectedCategory !== 'all') {
      return { filtered: filteredTemplates };
    }
    const groups: Record<string, Template[]> = {};
    TEMPLATE_CATEGORIES.forEach(cat => {
      groups[cat.id] = getTemplatesByCategory(cat.id);
    });
    return groups;
  }, [filteredTemplates, searchQuery, selectedCategory]);

  const selectedTemplate = TEMPLATES.find(t => t.id === value);

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 rounded-l-none shadow-lg h-20 px-1"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-card border-r border-border shadow-xl z-40 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-border space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground text-sm">Templates</h2>
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        
        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {TEMPLATE_CATEGORIES.map(cat => {
              const CatIcon = categoryIconMap[cat.id] || File;
              return (
                <SelectItem key={cat.id} value={cat.id}>
                  <div className="flex items-center gap-2">
                    <CatIcon className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Template List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {searchQuery || selectedCategory !== 'all' ? (
            // Flat list when filtered
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
              </p>
              {filteredTemplates.map(template => {
                const Icon = iconMap[template.icon] || File;
                const isSelected = value === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => onChange(template)}
                    className={cn(
                      'w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all duration-200 group',
                      isSelected 
                        ? 'bg-primary/10 text-primary border-2 border-primary/40 shadow-sm' 
                        : 'hover:bg-muted/60 border-2 border-transparent hover:border-border'
                    )}
                  >
                    <TemplatePreview templateId={template.id} size={40} />
                    <div className="min-w-0 flex-1">
                      <p className={cn('text-sm font-medium truncate', isSelected ? 'text-primary' : 'text-foreground')}>
                        {template.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{template.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            // Grouped by category
            <div className="space-y-4">
              {TEMPLATE_CATEGORIES.map(category => {
                const templates = groupedTemplates[category.id] || [];
                if (templates.length === 0) return null;
                const CatIcon = categoryIconMap[category.id] || File;
                
                return (
                  <div key={category.id}>
                    <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                      <CatIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">({templates.length})</span>
                    </div>
                    <div className="space-y-0.5">
                      {templates.map(template => {
                        const Icon = iconMap[template.icon] || File;
                        const isSelected = value === template.id;
                        return (
                          <button
                            key={template.id}
                            onClick={() => onChange(template)}
                            className={cn(
                              'w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all duration-200 group',
                              isSelected 
                                ? 'bg-primary/10 text-primary border-2 border-primary/40 shadow-sm' 
                                : 'hover:bg-muted/60 border-2 border-transparent hover:border-border'
                            )}
                          >
                            <TemplatePreview templateId={template.id} size={36} />
                            <div className="min-w-0 flex-1">
                              <p className={cn('text-sm font-medium truncate', isSelected ? 'text-primary' : 'text-foreground')}>
                                {template.name}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Selected Template Info */}
      {selectedTemplate && (
        <div className="p-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2">
            {(() => {
              const Icon = iconMap[selectedTemplate.icon] || File;
              return <Icon className="w-5 h-5 text-primary" />;
            })()}
            <div>
              <p className="text-sm font-medium text-foreground">{selectedTemplate.name}</p>
              <p className="text-xs text-muted-foreground">{selectedTemplate.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
