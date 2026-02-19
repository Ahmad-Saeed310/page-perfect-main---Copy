export interface TemplateConfig {
  lineSpacing: number; // mm
  marginTop: number; // mm
  marginBottom: number; // mm
  marginLeft: number; // mm
  marginRight: number; // mm
  showMarginLine: boolean;
  gridSize: number; // mm (for graph paper)
  lineColor: string;
  marginLineColor: string;
  pageColor: string;
}

const baseConfig: TemplateConfig = {
  lineSpacing: 7,
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20,
  showMarginLine: false,
  gridSize: 5,
  lineColor: '#d1d5db',
  marginLineColor: '#ef4444',
  pageColor: '#ffffff',
};

export const DEFAULT_CONFIGS: Record<string, TemplateConfig> = {
  // Basic Papers
  'blank': { ...baseConfig, lineSpacing: 0, gridSize: 0 },
  'thoroughly-blank': { ...baseConfig, lineSpacing: 0, gridSize: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 },
  'lined': { ...baseConfig, gridSize: 0 },
  'school-copy': { ...baseConfig, lineSpacing: 8, marginTop: 25, marginBottom: 20, marginLeft: 30, marginRight: 15, showMarginLine: true, lineColor: '#93c5fd', gridSize: 0 },
  'note-paper': { ...baseConfig, lineSpacing: 6, gridSize: 0, lineColor: '#e5e7eb' },
  'penmanship': { ...baseConfig, lineSpacing: 12, gridSize: 0, lineColor: '#93c5fd' },
  'wide-ruled': { ...baseConfig, lineSpacing: 10, gridSize: 0 },
  'narrow-ruled': { ...baseConfig, lineSpacing: 5, gridSize: 0 },

  // Graph & Grid Papers
  'graph': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#c7d2fe' },
  'dot-grid': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#9ca3af' },
  'working-sheet': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#e5e7eb', marginTop: 15, marginBottom: 15, marginLeft: 15, marginRight: 15 },
  'engineering': { ...baseConfig, lineSpacing: 0, gridSize: 2, showMarginLine: true, lineColor: '#86efac', marginLineColor: '#22c55e', pageColor: '#f0fdf4', marginLeft: 25, marginRight: 10 },
  'cartesian': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#c7d2fe' },
  'quadrant': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#c7d2fe' },
  'fine-grid': { ...baseConfig, lineSpacing: 0, gridSize: 2, lineColor: '#d1d5db' },
  'large-grid': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#9ca3af' },

  // Specialty Graphs
  'isometric': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#c7d2fe' },
  'hexagon': { ...baseConfig, lineSpacing: 0, gridSize: 8, lineColor: '#a5b4fc' },
  'octagon': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#a5b4fc' },
  'pentagon': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#a5b4fc' },
  'polar': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#93c5fd' },
  'logarithmic': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#f59e0b' },
  'semi-log': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#f59e0b' },
  'log-log': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#f59e0b' },
  'perspective-1pt': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#94a3b8' },
  'perspective-2pt': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#94a3b8' },
  'triangle': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#c7d2fe' },

  // Music & Art
  'music-sheet': { ...baseConfig, lineSpacing: 2, marginTop: 25, marginBottom: 25, lineColor: '#1f2937', gridSize: 0 },
  'guitar-tab': { ...baseConfig, lineSpacing: 2.5, marginTop: 25, marginBottom: 25, lineColor: '#1f2937', gridSize: 0 },
  'piano-staff': { ...baseConfig, lineSpacing: 2, marginTop: 25, marginBottom: 25, lineColor: '#1f2937', gridSize: 0 },
  'calligraphy': { ...baseConfig, lineSpacing: 10, lineColor: '#93c5fd', pageColor: '#fffbeb', gridSize: 0 },
  'storyboard': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#374151' },
  'comic-strip': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'sketch-pad': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#e5e7eb', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 },

  // Notes & Study
  'cornell-notes': { ...baseConfig, lineSpacing: 7, marginTop: 50, marginBottom: 60, marginLeft: 60, marginRight: 15, showMarginLine: true, marginLineColor: '#3b82f6', gridSize: 0 },
  'outline': { ...baseConfig, lineSpacing: 8, marginLeft: 40, gridSize: 0 },
  'mind-map': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#94a3b8' },
  'flashcard': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'columnar-2': { ...baseConfig, lineSpacing: 7, gridSize: 0 },
  'columnar-3': { ...baseConfig, lineSpacing: 7, gridSize: 0 },
  'columnar-pad': { ...baseConfig, lineSpacing: 5, gridSize: 0, lineColor: '#22c55e', pageColor: '#f0fdf4' },

  // Planners
  'planner': { ...baseConfig, lineSpacing: 12, marginTop: 30, marginLeft: 50, marginRight: 15, showMarginLine: true, marginLineColor: '#6366f1', gridSize: 0 },
  'weekly-planner': { ...baseConfig, lineSpacing: 0, gridSize: 0, marginTop: 30 },
  'monthly-planner': { ...baseConfig, lineSpacing: 0, gridSize: 0, marginTop: 30 },
  'habit-tracker': { ...baseConfig, lineSpacing: 8, gridSize: 0, marginTop: 30 },
  'goal-planner': { ...baseConfig, lineSpacing: 10, gridSize: 0, marginTop: 30 },
  'meal-planner': { ...baseConfig, lineSpacing: 0, gridSize: 0, marginTop: 30 },
  'diet-planner': { ...baseConfig, lineSpacing: 7, gridSize: 0, marginTop: 30, lineColor: '#86efac' },
  'fitness-log': { ...baseConfig, lineSpacing: 8, gridSize: 0, marginTop: 30 },
  'project-planner': { ...baseConfig, lineSpacing: 0, gridSize: 0, marginTop: 30 },

  // Budgets
  'budget-monthly': { ...baseConfig, lineSpacing: 6, gridSize: 0, marginTop: 30, lineColor: '#86efac', pageColor: '#f0fdf4' },
  'budget-weekly': { ...baseConfig, lineSpacing: 6, gridSize: 0, marginTop: 30, lineColor: '#86efac' },
  'expense-log': { ...baseConfig, lineSpacing: 6, gridSize: 0, lineColor: '#d1d5db' },
  'savings-tracker': { ...baseConfig, lineSpacing: 8, gridSize: 0, lineColor: '#86efac' },
  'debt-tracker': { ...baseConfig, lineSpacing: 8, gridSize: 0, lineColor: '#f87171' },
  'bill-tracker': { ...baseConfig, lineSpacing: 6, gridSize: 0 },
  'ledger': { ...baseConfig, lineSpacing: 5, gridSize: 0, lineColor: '#22c55e', pageColor: '#f0fdf4' },

  // Lists
  'todo-list': { ...baseConfig, lineSpacing: 8, marginLeft: 35, gridSize: 0 },
  'shopping-list': { ...baseConfig, lineSpacing: 7, marginLeft: 30, gridSize: 0 },
  'packing-list': { ...baseConfig, lineSpacing: 7, marginLeft: 30, gridSize: 0 },
  'bucket-list': { ...baseConfig, lineSpacing: 10, marginLeft: 30, gridSize: 0 },
  'reading-list': { ...baseConfig, lineSpacing: 12, marginLeft: 25, gridSize: 0 },
  'contact-list': { ...baseConfig, lineSpacing: 15, gridSize: 0 },
  'inventory-list': { ...baseConfig, lineSpacing: 6, gridSize: 0 },

  // Calendars
  'calendar-monthly': { ...baseConfig, lineSpacing: 0, gridSize: 0 },
  'calendar-weekly': { ...baseConfig, lineSpacing: 0, gridSize: 0 },
  'calendar-yearly': { ...baseConfig, lineSpacing: 0, gridSize: 0 },
  'appointment-book': { ...baseConfig, lineSpacing: 10, gridSize: 0, marginLeft: 40 },

  // Teacher Resources
  'grade-book': { ...baseConfig, lineSpacing: 6, gridSize: 0, marginTop: 35 },
  'attendance-sheet': { ...baseConfig, lineSpacing: 8, gridSize: 0, marginTop: 35 },
  'lesson-plan': { ...baseConfig, lineSpacing: 7, gridSize: 0, marginTop: 30 },
  'seating-chart': { ...baseConfig, lineSpacing: 0, gridSize: 15 },
  'homework-tracker': { ...baseConfig, lineSpacing: 8, gridSize: 0, marginTop: 30 },
  'test-template': { ...baseConfig, lineSpacing: 10, marginLeft: 40, gridSize: 0 },
  'spelling-test': { ...baseConfig, lineSpacing: 12, marginLeft: 15, gridSize: 0 },

  // Games
  'bingo-card': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'word-search': { ...baseConfig, lineSpacing: 0, gridSize: 6, lineColor: '#d1d5db' },
  'crossword': { ...baseConfig, lineSpacing: 0, gridSize: 7, lineColor: '#1f2937' },
  'sudoku': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'tic-tac-toe': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'maze': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#9ca3af' },
  'dots-boxes': { ...baseConfig, lineSpacing: 0, gridSize: 8, lineColor: '#1f2937' },

  // Sports
  'score-sheet': { ...baseConfig, lineSpacing: 8, gridSize: 0, marginTop: 35 },
  'soccer-field': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#22c55e', pageColor: '#dcfce7' },
  'basketball-court': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#ea580c', pageColor: '#fed7aa' },
  'tennis-court': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937', pageColor: '#dbeafe' },
  'baseball-diamond': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#854d0e', pageColor: '#fef3c7' },
  'football-field': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#ffffff', pageColor: '#22c55e' },
  'bracket': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'golf-scorecard': { ...baseConfig, lineSpacing: 6, gridSize: 0 },

  // Crafts
  'quilting': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#f472b6', pageColor: '#fdf2f8' },
  'knitting': { ...baseConfig, lineSpacing: 0, gridSize: 3, lineColor: '#a78bfa', pageColor: '#f5f3ff' },
  'cross-stitch': { ...baseConfig, lineSpacing: 0, gridSize: 3, lineColor: '#f87171' },
  'beadwork': { ...baseConfig, lineSpacing: 0, gridSize: 4, lineColor: '#fbbf24' },
  'needlework': { ...baseConfig, lineSpacing: 0, gridSize: 2, lineColor: '#f472b6' },
  'diamond-painting': { ...baseConfig, lineSpacing: 0, gridSize: 3, lineColor: '#38bdf8' },
  'crochet': { ...baseConfig, lineSpacing: 0, gridSize: 4, lineColor: '#c084fc' },

  // Cards & Tags
  'gift-tags': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'luggage-tags': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'postcard': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'business-card': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#d1d5db' },
  'name-badge': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'place-cards': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#d1d5db' },
  'labels': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },

  // Marketing
  'bifold': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#94a3b8' },
  'trifold': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#94a3b8' },
  'wireframe-desktop': { ...baseConfig, lineSpacing: 0, gridSize: 8, lineColor: '#e5e7eb' },
  'wireframe-mobile': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#e5e7eb' },
  'ui-grid': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#f472b6' },
  'flyer': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#d1d5db' },

  // 3D & Technical
  '3d-cube': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  '3d-pyramid': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  '3d-cylinder': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  '3d-prism': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'origami-grid': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#d1d5db' },
  'protractor': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'ruler': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },

  // Targets
  'target-circle': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'target-grid': { ...baseConfig, lineSpacing: 0, gridSize: 5, lineColor: '#1f2937' },
  'target-silhouette': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'target-crosshair': { ...baseConfig, lineSpacing: 0, gridSize: 0, lineColor: '#1f2937' },
  'target-dots': { ...baseConfig, lineSpacing: 0, gridSize: 10, lineColor: '#1f2937' },
};

export function getTemplateConfig(templateId: string): TemplateConfig {
  return DEFAULT_CONFIGS[templateId] || baseConfig;
}
