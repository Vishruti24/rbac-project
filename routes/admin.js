const express = require('express');
const { fetchuser, authorizeRoles } = require('../middleware/fetchuser');
const router = express.Router();

// Admin-only route
router.get('/dashboard', fetchuser, authorizeRoles('admin'), (req, res) => {
    res.json({ message: "Welcome Admin! Only admin can see this." });
});

module.exports = router;
