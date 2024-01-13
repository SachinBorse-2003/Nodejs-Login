// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

// Use HTTPS server
const httpsOptions = {
  key: fs.readFileSync('sudo /etc/nginx/ssl/nginx.key'),
  cert: fs.readFileSync('sudo /etc/nginx/ssl/nginx.crt'),
};

const server = https.createServer(httpsOptions, app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
