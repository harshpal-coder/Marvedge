
import { Router } from 'express';
const router = Router();

// Signup stub
router.post('/signup', (req, res) => {
  res.json({ token: 'fake-token', sessionToken: 'fake-session', user: { email: req.body.email, role: req.body.role || 'user', id: 'fake-id' } });
});

// Login stub
router.post('/login', (req, res) => {
  res.json({ token: 'fake-token', sessionToken: 'fake-session', user: { email: req.body.email, role: 'user', id: 'fake-id' } });
});

// Logout stub
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

export default router;
