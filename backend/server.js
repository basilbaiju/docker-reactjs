const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const Redis = require('ioredis');
const cors = require('cors');

// Initialize app
const app = express();
const redisClient = new Redis(); // Default to localhost:6379, which is Redis container in Docker

app.use(cors({ origin: 'http://localhost', credentials: true })); // Allow requests from React app
app.use(express.json());

// Configure session
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'your-secret-key',  // Change this for production!
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 },  // Session expiry time
    })
);

// Example route
app.get('/session', (req, res) => {
    if (!req.session.views) {
        req.session.views = 1;
    } else {
        req.session.views++;
    }
    res.json({ views: req.session.views });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
