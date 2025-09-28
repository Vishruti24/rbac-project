const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';

// Create user
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success, errors: errors.array() });

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ success, error: "User exists" });

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            roles: req.body.roles || ['user']
        });

        const data = { user: { id: user.id, roles: user.roles } };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken, roles: user.roles });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// Login
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success, errors: errors.array() });

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success, error: "Invalid credentials" });

        const passComp = await bcrypt.compare(password, user.password);
        if (!passComp) return res.status(400).json({ success, error: "Invalid credentials" });

        const data = { user: { id: user.id, roles: user.roles } };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken, roles: user.roles });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
