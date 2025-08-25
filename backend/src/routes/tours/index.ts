

import { Router } from 'express';
const router = Router();

// In-memory tours stub
let tours: any[] = [
  {
    id: '1',
    title: 'Onboarding Walkthrough',
    steps: [
      { id: 's1', description: 'Welcome to the dashboard!', image: '' },
      { id: 's2', description: 'Click the + button to create a new tour.', image: '' },
    ],
    visibility: 'public',
    owner: 'demo@marvedge.com',
  },
  {
    id: '2',
    title: 'Feature Highlight: Analytics',
    steps: [
      { id: 's1', description: 'See your product usage stats here.', image: '' },
    ],
    visibility: 'private',
    owner: 'demo@marvedge.com',
  },
  {
    id: '3',
    title: 'How to Record a Tour',
    steps: [
      { id: 's1', description: 'Click the Record button to start.', image: '' },
      { id: 's2', description: 'Stop recording when done.', image: '' },
    ],
    visibility: 'public',
    owner: 'demo@marvedge.com',
  },
  {
    id: '4',
    title: 'Admin Demo',
    steps: [
      { id: 's1', description: 'Admins can manage all tours.', image: '' },
    ],
    visibility: 'private',
    owner: 'admin@marvedge.com',
  },
  {
    id: '5',
    title: 'Mobile App Tour',
    steps: [
      { id: 's1', description: 'This tour is optimized for mobile.', image: '' },
    ],
    visibility: 'public',
    owner: 'demo@marvedge.com',
  },
  {
    id: '6',
    title: 'Integrations Guide',
    steps: [
      { id: 's1', description: 'Connect with Slack, Zapier, and more.', image: '' },
    ],
    visibility: 'public',
    owner: 'demo@marvedge.com',
  },
  {
    id: '7',
    title: 'Advanced Customization',
    steps: [
      { id: 's1', description: 'Use custom CSS for your tours.', image: '' },
    ],
    visibility: 'private',
    owner: 'demo@marvedge.com',
  },
];

// Get all tours
router.get('/', (req, res) => {
  res.json(tours);
});

// Get single tour
router.get('/:id', (req, res) => {
  const tour = tours.find(t => t.id === req.params.id);
  if (!tour) return res.status(404).json({ error: 'Not found' });
  res.json(tour);
});

// Create new tour
router.post('/', (req, res) => {
  const { title, steps, visibility } = req.body;
  const newTour = { id: Date.now().toString(), title, steps, visibility: visibility || 'private', owner: req.body.owner || 'user' };
  tours.push(newTour);
  res.status(201).json(newTour);
});

// Update tour
router.put('/:id', (req, res) => {
  const idx = tours.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  tours[idx] = { ...tours[idx], ...req.body };
  res.json(tours[idx]);
});

// Delete tour
router.delete('/:id', (req, res) => {
  const idx = tours.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  tours.splice(idx, 1);
  res.status(204).end();
});

export default router;
