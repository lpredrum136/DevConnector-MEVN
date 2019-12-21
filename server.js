const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Start app
const app = express();

// Init middleware
app.use(express.json());
app.use(cors());

// Connect database
connectDB();

// Define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(__dirname + '/server/public'));

  // any routes, handle single page app
  app.get(/.*/, (req, res) =>
    res.sendFile(__dirname + '/server/public/index.html')
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
