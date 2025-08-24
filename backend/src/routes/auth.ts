
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Session from '../models/Session';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';


// Signup
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash, role: role || 'user' });
    await user.save();
    const token = jwt.sign({ email, role: user.role, id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    // Create session in DB
    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  await Session.create({ userId: (user as any)._id.toString(), sessionToken, createdAt: new Date(), expiresAt });
    res.json({ token, sessionToken, user: { email, role: user.role, id: user._id } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ email, role: user.role, id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    // Create session in DB
    const sessionToken = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  await Session.create({ userId: (user as any)._id.toString(), sessionToken, createdAt: new Date(), expiresAt });
    res.json({ token, sessionToken, user: { email, role: user.role, id: user._id } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout (delete session)
router.post('/logout', async (req, res) => {
  const { sessionToken } = req.body;
  if (!sessionToken) return res.status(400).json({ error: 'Missing session token' });
  try {
    await Session.deleteOne({ sessionToken });
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
