"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
// Mock user DB
const users = [];
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Missing fields' });
    const exists = users.find(u => u.email === email);
    if (exists)
        return res.status(409).json({ error: 'User already exists' });
    const hash = await bcryptjs_1.default.hash(password, 10);
    users.push({ email, password: hash });
    const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { email } });
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { email } });
});
exports.default = router;
