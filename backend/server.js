const session = require('express-session');
const RedisStore = require('connect-redis').default; // Use .default for newer versions

const redis = require('redis');
const redisClient = redis.createClient({
  host: 'redis', // Docker service name
  port: 6379,
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Use RedisStore with express-session
const store = new RedisStore({
  client: redisClient,
});

const express = require('express');
const app = express();

app.use(
  session({
    store: store,
    secret: 'b61900a66955d32de8ea2e2277bb6da69c3970bda746561eb244d5fa454db32d', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/session', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(`Session Views: ${req.session.views}`);
});

app.listen(5000, () => {
  console.log('Backend is running on port 5000');
});
