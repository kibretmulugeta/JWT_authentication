const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const configurePassport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');

// Initialize database connection
connectDB();

// Initialize Passport strategy
configurePassport();

const app = express();

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());

// Serve Static Frontend Assets
app.use(express.static(path.join(__dirname, '../public')));

// Authentication API Routes
app.use('/auth', authRoutes);

// HTML Page Routes
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Fallback 404 Route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`🚀 Google OAuth Auth Server is running!`);
  console.log(`🔗 Local Base URL: http://localhost:${PORT}`);
  console.log(`==========================================`);
});
