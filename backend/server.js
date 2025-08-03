const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running' });
});

// Debug GET handler for /upload/stretto
app.get('/upload/stretto', (req, res) => {
  res.send('This endpoint only accepts POST requests for file upload.');
});

// Stretto routes
const strettoRoutes = require('./routes/stretto');
app.use('/upload', strettoRoutes);

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on 0.0.0.0:${PORT}`));
