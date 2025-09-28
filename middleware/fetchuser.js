const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';

const fetchuser = (req, res, next) => {
    // Check for token in Authorization header (Bearer token) or auth-token header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : req.header('auth-token');
    
    if (!token) return res.status(401).json({ error: "Authenticate using valid token" });

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user.roles.some(r => roles.includes(r))) {
            return res.status(403).json({ error: "Access denied: insufficient role" });
        }
        next();
    }
};

module.exports = { fetchuser, authorizeRoles };
