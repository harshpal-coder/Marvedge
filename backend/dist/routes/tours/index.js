"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Mock tours DB
let tours = [
    {
        id: '1',
        title: 'Demo: Onboarding Flow',
        steps: [
            { id: 's1', image: undefined, description: 'Step 1: Welcome screen' },
            { id: 's2', image: undefined, description: 'Step 2: Fill details' },
        ],
        visibility: 'public',
        createdAt: '2025-08-20',
        views: 123,
        owner: 'test@example.com',
    },
];
// Get all tours (mock, no auth)
router.get('/', (req, res) => {
    res.json(tours);
});
// Get single tour
router.get('/:id', (req, res) => {
    const tour = tours.find(t => t.id === req.params.id);
    if (!tour)
        return res.status(404).json({ error: 'Not found' });
    res.json(tour);
});
// Create new tour
router.post('/', (req, res) => {
    const { title, steps, visibility, owner } = req.body;
    const newTour = {
        id: Date.now().toString(),
        title,
        steps,
        visibility: visibility || 'private',
        createdAt: new Date().toISOString().slice(0, 10),
        views: 0,
        owner,
    };
    tours.push(newTour);
    res.status(201).json(newTour);
});
// Update tour
router.put('/:id', (req, res) => {
    const idx = tours.findIndex(t => t.id === req.params.id);
    if (idx === -1)
        return res.status(404).json({ error: 'Not found' });
    tours[idx] = { ...tours[idx], ...req.body };
    res.json(tours[idx]);
});
// Delete tour
router.delete('/:id', (req, res) => {
    tours = tours.filter(t => t.id !== req.params.id);
    res.status(204).end();
});
exports.default = router;
