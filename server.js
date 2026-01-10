const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory store for latest alert (for demo purposes)
let latestAlert = null;

// Routes

// Status Endpoint
app.get('/api/status', (req, res) => {
    res.json({
        status: 'Monitoring',
        uptime: process.uptime(),
        lastAlert: latestAlert
    });
});

// Alert Endpoint
app.post('/api/alert', (req, res) => {
    const { latitude, longitude, severity, timestamp } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Missing location data' });
    }

    latestAlert = {
        latitude,
        longitude,
        severity: severity || 'High',
        timestamp: timestamp || new Date().toISOString()
    };

    console.log('!!! ACCIDENT ALERT RECEIVED !!!');
    console.log(latestAlert);

    // In a real app, this would trigger SMS/Email/Emergency Services

    res.json({ message: 'Alert received and processing', alertId: Date.now() });
});

// Root
app.get('/', (req, res) => {
    res.send('Smart Accident Detection Backend is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
