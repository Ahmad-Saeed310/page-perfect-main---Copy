export interface TemplateCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  { id: 'basic', name: 'Basic Papers', icon: 'file', description: 'Essential writing papers' },
  { id: 'graph', name: 'Graph & Grid Papers', icon: 'grid-3x3', description: 'Mathematical and technical grids' },
  { id: 'specialty-graph', name: 'Specialty Graphs', icon: 'triangle', description: 'Specialized graph patterns' },
  { id: 'music-art', name: 'Music & Art', icon: 'music', description: 'Creative and musical sheets' },
  { id: 'notes-study', name: 'Notes & Study', icon: 'book-open', description: 'Learning and note-taking' },
  { id: 'planners', name: 'Planners & Organizers', icon: 'calendar', description: 'Scheduling and planning' },
  { id: 'budgets', name: 'Budgets & Finance', icon: 'wallet', description: 'Financial tracking sheets' },
  { id: 'lists', name: 'Printable Lists', icon: 'list', description: 'Checklists and to-do lists' },
  { id: 'calendars', name: 'Calendars', icon: 'calendar-days', description: 'Monthly and weekly calendars' },
  { id: 'teacher', name: 'Teacher Resources', icon: 'graduation-cap', description: 'Educational materials' },
  { id: 'games', name: 'Games & Activities', icon: 'gamepad-2', description: 'Printable games and puzzles' },
  { id: 'sports', name: 'Sports & Recreation', icon: 'trophy', description: 'Sports diagrams and score sheets' },
  { id: 'crafts', name: 'Crafts & Hobbies', icon: 'scissors', description: 'Quilting, knitting, beadwork' },
  { id: 'cards-tags', name: 'Cards & Tags', icon: 'tag', description: 'Gift tags and postcards' },
  { id: 'marketing', name: 'Marketing & Design', icon: 'layout', description: 'Brochures and wireframes' },
  { id: '3d-technical', name: '3D & Technical', icon: 'box', description: '3D papers and technical drawings' },
  { id: 'targets', name: 'Shooting Targets', icon: 'target', description: 'Practice targets' },
];

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords?: string[];
}

export const TEMPLATES: Template[] = [
  // Basic Papers
  { id: 'blank', name: 'Blank Page', description: 'Clean page with margins', icon: 'file', category: 'basic', keywords: ['empty', 'plain'] },
  { id: 'thoroughly-blank', name: 'Thoroughly Blank', description: 'No margins, edge to edge', icon: 'square', category: 'basic', keywords: ['full', 'borderless'] },
  { id: 'lined', name: 'Lined Paper', description: 'Standard ruled lines', icon: 'align-left', category: 'basic', keywords: ['ruled', 'writing'] },
  { id: 'school-copy', name: 'School Copy', description: 'Wide ruled with margin', icon: 'book-open', category: 'basic', keywords: ['notebook', 'wide rule'] },
  { id: 'note-paper', name: 'Note Paper', description: 'Simple notepad style', icon: 'sticky-note', category: 'basic', keywords: ['memo', 'notepad'] },
  { id: 'penmanship', name: 'Penmanship Paper', description: 'Handwriting practice lines', icon: 'pen-line', category: 'basic', keywords: ['handwriting', 'practice'] },
  { id: 'wide-ruled', name: 'Wide Ruled', description: 'Extra spacing between lines', icon: 'align-left', category: 'basic', keywords: ['large', 'kids'] },
  { id: 'narrow-ruled', name: 'Narrow Ruled', description: 'Closer line spacing', icon: 'align-justify', category: 'basic', keywords: ['tight', 'compact'] },
  
  // Graph & Grid Papers
  { id: 'graph', name: 'Graph Paper', description: 'Square grid pattern', icon: 'grid-3x3', category: 'graph', keywords: ['square', 'math'] },
  { id: 'dot-grid', name: 'Dot Grid', description: 'Dotted grid pattern', icon: 'grip', category: 'graph', keywords: ['bullet journal', 'dots'] },
  { id: 'working-sheet', name: 'Working Sheet', description: 'Subtle grid for drafting', icon: 'layout-grid', category: 'graph', keywords: ['draft', 'light'] },
  { id: 'engineering', name: 'Engineering Paper', description: 'Fine grid with margins', icon: 'ruler', category: 'graph', keywords: ['green', 'technical'] },
  { id: 'cartesian', name: 'Cartesian Graph', description: 'X-Y axis coordinate grid', icon: 'axis-3d', category: 'graph', keywords: ['coordinate', 'math', 'axis'] },
  { id: 'quadrant', name: 'Quadrant Paper', description: 'Four quadrant coordinate', icon: 'grid-2x2', category: 'graph', keywords: ['coordinate', 'four'] },
  { id: 'fine-grid', name: 'Fine Grid', description: 'Small squares, 2mm grid', icon: 'grid-3x3', category: 'graph', keywords: ['small', 'detailed'] },
  { id: 'large-grid', name: 'Large Grid', description: 'Big squares, 10mm grid', icon: 'square', category: 'graph', keywords: ['big', 'bold'] },
  
  // Specialty Graphs
  { id: 'isometric', name: 'Isometric Grid', description: '3D drawing grid', icon: 'box', category: 'specialty-graph', keywords: ['3d', 'perspective'] },
  { id: 'hexagon', name: 'Hexagon Grid', description: 'Hex pattern for gaming', icon: 'hexagon', category: 'specialty-graph', keywords: ['hex', 'rpg', 'game'] },
  { id: 'octagon', name: 'Octagon Grid', description: 'Eight-sided pattern', icon: 'octagon', category: 'specialty-graph', keywords: ['eight', 'tiling'] },
  { id: 'pentagon', name: 'Pentagon Grid', description: 'Five-sided pattern', icon: 'pentagon', category: 'specialty-graph', keywords: ['five', 'tiling'] },
  { id: 'polar', name: 'Polar Graph', description: 'Circular coordinate grid', icon: 'circle-dot', category: 'specialty-graph', keywords: ['circular', 'radial', 'trigonometry'] },
  { id: 'logarithmic', name: 'Logarithmic Paper', description: 'Log scale graph paper', icon: 'trending-up', category: 'specialty-graph', keywords: ['log', 'semi-log', 'exponential'] },
  { id: 'semi-log', name: 'Semi-Log Paper', description: 'One log scale axis', icon: 'chart-line', category: 'specialty-graph', keywords: ['log', 'linear'] },
  { id: 'log-log', name: 'Log-Log Paper', description: 'Both axes logarithmic', icon: 'chart-spline', category: 'specialty-graph', keywords: ['double log'] },
  { id: 'perspective-1pt', name: '1-Point Perspective', description: 'Single vanishing point', icon: 'move-3d', category: 'specialty-graph', keywords: ['drawing', 'art'] },
  { id: 'perspective-2pt', name: '2-Point Perspective', description: 'Two vanishing points', icon: 'move-3d', category: 'specialty-graph', keywords: ['drawing', 'architecture'] },
  { id: 'triangle', name: 'Triangle Grid', description: 'Equilateral triangle pattern', icon: 'triangle', category: 'specialty-graph', keywords: ['triangular', 'tessellation'] },
  
  // Music & Art
  { id: 'music-sheet', name: 'Music Sheet', description: 'Staff lines for music', icon: 'music', category: 'music-art', keywords: ['staff', 'notation'] },
  { id: 'guitar-tab', name: 'Guitar Tab', description: 'Tablature for guitar', icon: 'guitar', category: 'music-art', keywords: ['tab', 'guitar'] },
  { id: 'piano-staff', name: 'Piano Staff', description: 'Grand staff for piano', icon: 'piano', category: 'music-art', keywords: ['grand staff', 'piano'] },
  { id: 'calligraphy', name: 'Calligraphy', description: 'Guidelines for lettering', icon: 'pen-tool', category: 'music-art', keywords: ['lettering', 'script'] },
  { id: 'storyboard', name: 'Storyboard', description: 'Frames for visual planning', icon: 'film', category: 'music-art', keywords: ['film', 'video', 'animation'] },
  { id: 'comic-strip', name: 'Comic Strip', description: 'Comic panel layout', icon: 'layout-panel-left', category: 'music-art', keywords: ['comics', 'manga'] },
  { id: 'sketch-pad', name: 'Sketch Pad', description: 'Light grid for sketching', icon: 'palette', category: 'music-art', keywords: ['drawing', 'art'] },
  
  // Notes & Study
  { id: 'cornell-notes', name: 'Cornell Notes', description: 'Study note-taking format', icon: 'notebook-pen', category: 'notes-study', keywords: ['study', 'college'] },
  { id: 'outline', name: 'Outline Paper', description: 'Hierarchical note structure', icon: 'list-tree', category: 'notes-study', keywords: ['organization', 'hierarchy'] },
  { id: 'mind-map', name: 'Mind Map', description: 'Central idea brainstorm', icon: 'network', category: 'notes-study', keywords: ['brainstorm', 'ideas'] },
  { id: 'flashcard', name: 'Flashcard Template', description: 'Study flashcards', icon: 'layers', category: 'notes-study', keywords: ['memory', 'quiz'] },
  { id: 'columnar-2', name: '2-Column Notes', description: 'Two column layout', icon: 'columns-2', category: 'notes-study', keywords: ['split', 'comparison'] },
  { id: 'columnar-3', name: '3-Column Notes', description: 'Three column layout', icon: 'columns-3', category: 'notes-study', keywords: ['triple', 'comparison'] },
  { id: 'columnar-pad', name: 'Columnar Pad', description: 'Accounting columnar paper', icon: 'table', category: 'notes-study', keywords: ['accounting', 'ledger'] },
  
  // Planners & Organizers
  { id: 'planner', name: 'Daily Planner', description: 'Schedule with time slots', icon: 'calendar', category: 'planners', keywords: ['schedule', 'day'] },
  { id: 'weekly-planner', name: 'Weekly Planner', description: 'Week at a glance', icon: 'calendar-range', category: 'planners', keywords: ['week', 'schedule'] },
  { id: 'monthly-planner', name: 'Monthly Planner', description: 'Month overview', icon: 'calendar-days', category: 'planners', keywords: ['month', 'schedule'] },
  { id: 'habit-tracker', name: 'Habit Tracker', description: 'Daily habit checklist', icon: 'check-square', category: 'planners', keywords: ['habits', 'routine'] },
  { id: 'goal-planner', name: 'Goal Planner', description: 'Goal setting worksheet', icon: 'target', category: 'planners', keywords: ['goals', 'objectives'] },
  { id: 'meal-planner', name: 'Meal Planner', description: 'Weekly meal planning', icon: 'utensils', category: 'planners', keywords: ['food', 'menu'] },
  { id: 'diet-planner', name: 'Diet Planner', description: 'Calorie and nutrition tracker', icon: 'apple', category: 'planners', keywords: ['nutrition', 'calories', 'health'] },
  { id: 'fitness-log', name: 'Fitness Log', description: 'Exercise tracking', icon: 'dumbbell', category: 'planners', keywords: ['workout', 'gym'] },
  { id: 'project-planner', name: 'Project Planner', description: 'Project timeline', icon: 'gantt-chart', category: 'planners', keywords: ['project', 'timeline'] },
  
  // Budgets & Finance
  { id: 'budget-monthly', name: 'Monthly Budget', description: 'Income and expense tracker', icon: 'wallet', category: 'budgets', keywords: ['money', 'finance'] },
  { id: 'budget-weekly', name: 'Weekly Budget', description: 'Weekly spending tracker', icon: 'credit-card', category: 'budgets', keywords: ['spending', 'weekly'] },
  { id: 'expense-log', name: 'Expense Log', description: 'Daily expense tracking', icon: 'receipt', category: 'budgets', keywords: ['expenses', 'log'] },
  { id: 'savings-tracker', name: 'Savings Tracker', description: 'Savings goal progress', icon: 'piggy-bank', category: 'budgets', keywords: ['savings', 'goals'] },
  { id: 'debt-tracker', name: 'Debt Tracker', description: 'Debt payoff tracker', icon: 'trending-down', category: 'budgets', keywords: ['debt', 'payoff'] },
  { id: 'bill-tracker', name: 'Bill Tracker', description: 'Monthly bills checklist', icon: 'file-text', category: 'budgets', keywords: ['bills', 'payments'] },
  { id: 'ledger', name: 'Ledger Paper', description: 'Accounting ledger', icon: 'book', category: 'budgets', keywords: ['accounting', 'bookkeeping'] },
  
  // Printable Lists
  { id: 'todo-list', name: 'To-Do List', description: 'Task checklist', icon: 'list-checks', category: 'lists', keywords: ['tasks', 'checklist'] },
  { id: 'shopping-list', name: 'Shopping List', description: 'Grocery shopping', icon: 'shopping-cart', category: 'lists', keywords: ['grocery', 'shopping'] },
  { id: 'packing-list', name: 'Packing List', description: 'Travel packing checklist', icon: 'luggage', category: 'lists', keywords: ['travel', 'packing'] },
  { id: 'bucket-list', name: 'Bucket List', description: 'Life goals list', icon: 'star', category: 'lists', keywords: ['goals', 'dreams'] },
  { id: 'reading-list', name: 'Reading List', description: 'Books to read', icon: 'book-open', category: 'lists', keywords: ['books', 'reading'] },
  { id: 'contact-list', name: 'Contact List', description: 'Phone and address book', icon: 'contact', category: 'lists', keywords: ['contacts', 'phone'] },
  { id: 'inventory-list', name: 'Inventory List', description: 'Stock tracking', icon: 'package', category: 'lists', keywords: ['inventory', 'stock'] },
  
  // Calendars
  { id: 'calendar-monthly', name: 'Monthly Calendar', description: 'Full month view', icon: 'calendar', category: 'calendars', keywords: ['month', 'dates'] },
  { id: 'calendar-weekly', name: 'Weekly Calendar', description: 'Week view', icon: 'calendar-range', category: 'calendars', keywords: ['week', 'dates'] },
  { id: 'calendar-yearly', name: 'Yearly Calendar', description: 'Year at a glance', icon: 'calendar-clock', category: 'calendars', keywords: ['year', 'annual'] },
  { id: 'appointment-book', name: 'Appointment Book', description: 'Hourly appointments', icon: 'clock', category: 'calendars', keywords: ['appointments', 'schedule'] },
  
  // Teacher Resources
  { id: 'grade-book', name: 'Grade Book', description: 'Student grade tracking', icon: 'graduation-cap', category: 'teacher', keywords: ['grades', 'students'] },
  { id: 'attendance-sheet', name: 'Attendance Sheet', description: 'Class attendance', icon: 'users', category: 'teacher', keywords: ['attendance', 'class'] },
  { id: 'lesson-plan', name: 'Lesson Plan', description: 'Lesson planning template', icon: 'file-text', category: 'teacher', keywords: ['lesson', 'teaching'] },
  { id: 'seating-chart', name: 'Seating Chart', description: 'Classroom seating', icon: 'layout-grid', category: 'teacher', keywords: ['seats', 'classroom'] },
  { id: 'homework-tracker', name: 'Homework Tracker', description: 'Assignment tracking', icon: 'clipboard-list', category: 'teacher', keywords: ['homework', 'assignments'] },
  { id: 'test-template', name: 'Test Template', description: 'Exam answer sheet', icon: 'file-question', category: 'teacher', keywords: ['test', 'exam'] },
  { id: 'spelling-test', name: 'Spelling Test', description: 'Spelling test paper', icon: 'spell-check', category: 'teacher', keywords: ['spelling', 'test'] },
  
  // Games & Activities
  { id: 'bingo-card', name: 'Bingo Card', description: 'Blank bingo template', icon: 'grid-3x3', category: 'games', keywords: ['bingo', 'game'] },
  { id: 'word-search', name: 'Word Search Grid', description: 'Word puzzle grid', icon: 'search', category: 'games', keywords: ['puzzle', 'words'] },
  { id: 'crossword', name: 'Crossword Grid', description: 'Crossword puzzle grid', icon: 'hash', category: 'games', keywords: ['puzzle', 'crossword'] },
  { id: 'sudoku', name: 'Sudoku Grid', description: 'Sudoku puzzle template', icon: 'grid-3x3', category: 'games', keywords: ['sudoku', 'numbers'] },
  { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', description: 'Game boards', icon: 'hash', category: 'games', keywords: ['game', 'noughts'] },
  { id: 'maze', name: 'Maze Template', description: 'Blank maze grid', icon: 'route', category: 'games', keywords: ['maze', 'puzzle'] },
  { id: 'dots-boxes', name: 'Dots and Boxes', description: 'Dot grid game', icon: 'grip', category: 'games', keywords: ['game', 'dots'] },
  
  // Sports & Recreation
  { id: 'score-sheet', name: 'Score Sheet', description: 'General score tracking', icon: 'trophy', category: 'sports', keywords: ['score', 'game'] },
  { id: 'soccer-field', name: 'Soccer Field', description: 'Football pitch diagram', icon: 'circle', category: 'sports', keywords: ['football', 'soccer'] },
  { id: 'basketball-court', name: 'Basketball Court', description: 'Court diagram', icon: 'circle', category: 'sports', keywords: ['basketball', 'court'] },
  { id: 'tennis-court', name: 'Tennis Court', description: 'Court diagram', icon: 'square', category: 'sports', keywords: ['tennis', 'court'] },
  { id: 'baseball-diamond', name: 'Baseball Diamond', description: 'Field diagram', icon: 'diamond', category: 'sports', keywords: ['baseball', 'field'] },
  { id: 'football-field', name: 'Football Field', description: 'American football field', icon: 'rectangle-horizontal', category: 'sports', keywords: ['american', 'football'] },
  { id: 'bracket', name: 'Tournament Bracket', description: 'Elimination bracket', icon: 'git-branch', category: 'sports', keywords: ['tournament', 'bracket'] },
  { id: 'golf-scorecard', name: 'Golf Scorecard', description: 'Golf scoring', icon: 'flag', category: 'sports', keywords: ['golf', 'score'] },
  
  // Crafts & Hobbies
  { id: 'quilting', name: 'Quilting Graph', description: 'Quilt pattern design', icon: 'grid-3x3', category: 'crafts', keywords: ['quilt', 'sewing'] },
  { id: 'knitting', name: 'Knitting Graph', description: 'Knitting pattern grid', icon: 'grid-3x3', category: 'crafts', keywords: ['knit', 'yarn'] },
  { id: 'cross-stitch', name: 'Cross Stitch Graph', description: 'Cross stitch pattern', icon: 'grid-3x3', category: 'crafts', keywords: ['embroidery', 'stitch'] },
  { id: 'beadwork', name: 'Beadwork Layout', description: 'Bead pattern design', icon: 'grip', category: 'crafts', keywords: ['beads', 'jewelry'] },
  { id: 'needlework', name: 'Needlework Graph', description: 'Needlepoint pattern', icon: 'grid-3x3', category: 'crafts', keywords: ['needle', 'embroidery'] },
  { id: 'diamond-painting', name: 'Diamond Painting', description: 'Diamond art canvas', icon: 'diamond', category: 'crafts', keywords: ['diamond', 'art'] },
  { id: 'crochet', name: 'Crochet Graph', description: 'Crochet pattern grid', icon: 'grid-3x3', category: 'crafts', keywords: ['crochet', 'yarn'] },
  
  // Cards & Tags
  { id: 'gift-tags', name: 'Gift Tags', description: 'Printable gift tags', icon: 'tag', category: 'cards-tags', keywords: ['gift', 'tags'] },
  { id: 'luggage-tags', name: 'Luggage Tags', description: 'Travel bag tags', icon: 'luggage', category: 'cards-tags', keywords: ['travel', 'luggage'] },
  { id: 'postcard', name: 'Postcard', description: 'Printable postcards', icon: 'mail', category: 'cards-tags', keywords: ['mail', 'postcard'] },
  { id: 'business-card', name: 'Business Card', description: 'Business card template', icon: 'credit-card', category: 'cards-tags', keywords: ['business', 'card'] },
  { id: 'name-badge', name: 'Name Badge', description: 'Name tag template', icon: 'badge', category: 'cards-tags', keywords: ['name', 'badge'] },
  { id: 'place-cards', name: 'Place Cards', description: 'Table place cards', icon: 'rectangle-horizontal', category: 'cards-tags', keywords: ['table', 'event'] },
  { id: 'labels', name: 'Label Template', description: 'Printable labels', icon: 'tag', category: 'cards-tags', keywords: ['labels', 'stickers'] },
  
  // Marketing & Design
  { id: 'bifold', name: 'Bi-fold Brochure', description: 'Two-fold brochure', icon: 'book-copy', category: 'marketing', keywords: ['brochure', 'fold'] },
  { id: 'trifold', name: 'Tri-fold Brochure', description: 'Three-fold brochure', icon: 'book-copy', category: 'marketing', keywords: ['brochure', 'trifold'] },
  { id: 'wireframe-desktop', name: 'Desktop Wireframe', description: 'Website wireframe', icon: 'monitor', category: 'marketing', keywords: ['web', 'ui'] },
  { id: 'wireframe-mobile', name: 'Mobile Wireframe', description: 'Mobile app wireframe', icon: 'smartphone', category: 'marketing', keywords: ['app', 'mobile', 'ui'] },
  { id: 'ui-grid', name: 'UI Grid', description: '12-column layout grid', icon: 'layout', category: 'marketing', keywords: ['grid', 'design'] },
  { id: 'flyer', name: 'Flyer Template', description: 'Promotional flyer', icon: 'file', category: 'marketing', keywords: ['flyer', 'poster'] },
  
  // 3D & Technical
  { id: '3d-cube', name: '3D Cube Net', description: 'Cube paper craft', icon: 'box', category: '3d-technical', keywords: ['cube', 'fold'] },
  { id: '3d-pyramid', name: '3D Pyramid Net', description: 'Pyramid paper craft', icon: 'triangle', category: '3d-technical', keywords: ['pyramid', 'fold'] },
  { id: '3d-cylinder', name: '3D Cylinder Net', description: 'Cylinder paper craft', icon: 'cylinder', category: '3d-technical', keywords: ['cylinder', 'fold'] },
  { id: '3d-prism', name: '3D Prism Net', description: 'Prism paper craft', icon: 'box', category: '3d-technical', keywords: ['prism', 'fold'] },
  { id: 'origami-grid', name: 'Origami Grid', description: 'Fold guidelines', icon: 'diamond', category: '3d-technical', keywords: ['origami', 'paper'] },
  { id: 'protractor', name: 'Protractor', description: 'Printable protractor', icon: 'semicircle', category: '3d-technical', keywords: ['angle', 'measure'] },
  { id: 'ruler', name: 'Printable Ruler', description: 'Inch and cm ruler', icon: 'ruler', category: '3d-technical', keywords: ['measure', 'ruler'] },
  
  // Shooting Targets
  { id: 'target-circle', name: 'Circle Target', description: 'Bullseye target', icon: 'target', category: 'targets', keywords: ['bullseye', 'shooting'] },
  { id: 'target-grid', name: 'Grid Target', description: 'Grid pattern target', icon: 'grid-3x3', category: 'targets', keywords: ['grid', 'shooting'] },
  { id: 'target-silhouette', name: 'Silhouette Target', description: 'Human silhouette', icon: 'user', category: 'targets', keywords: ['silhouette', 'training'] },
  { id: 'target-crosshair', name: 'Crosshair Target', description: 'Precision target', icon: 'crosshair', category: 'targets', keywords: ['precision', 'scope'] },
  { id: 'target-dots', name: 'Dot Target', description: 'Multiple dot targets', icon: 'grip', category: 'targets', keywords: ['dots', 'practice'] },
];

export function getTemplatesByCategory(categoryId: string): Template[] {
  return TEMPLATES.filter(t => t.category === categoryId);
}

export function searchTemplates(query: string): Template[] {
  const q = query.toLowerCase().trim();
  if (!q) return TEMPLATES;
  
  return TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q) ||
    t.keywords?.some(k => k.toLowerCase().includes(q))
  );
}

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find(t => t.id === id);
}
