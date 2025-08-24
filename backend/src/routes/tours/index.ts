

import { Router } from 'express';
import Tour from '../../models/Tour';
import { authenticate, AuthRequest } from '../../middleware/auth';

const router = Router();

// Get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single tour
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new tour (auth required)
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { title, steps, visibility } = req.body;
    const newTour = new Tour({
      title,
      steps,
      visibility: visibility || 'private',
      owner: req.user?.email,
    });
    await newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update tour (auth required, only owner or admin)
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Not found' });
    if (tour.owner !== req.user?.email && req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete tour (auth required, only owner or admin)
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Not found' });
    if (tour.owner !== req.user?.email && req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
