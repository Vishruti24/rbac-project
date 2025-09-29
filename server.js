const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'RBAC Backend Server is running!' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
