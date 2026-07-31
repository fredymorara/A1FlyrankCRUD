import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- STAGE 1: OPEN AUTH ---

// 1. Sign Up Route
app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body || {};

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Register with Supabase
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data.user);
});

// 2. Log In Route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Authenticate with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    // Return 401 specifically as requested by the assignment
    return res.status(401).json({ error: 'Invalid login credentials' });
  }

  return res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: data.user
  });
});

// --- STAGE 2: THE GATES ---

// Public Route
app.get('/public/info', (req, res) => {
  return res.status(200).json({ message: 'Welcome stranger! This info is public.' });
});

// Protected Route (Unverified)
app.get('/protected/profile', (req, res) => {
  // 1. Get the Authorization header
  const authHeader = req.headers.authorization;

  // 2. Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // 3. Extract the token (split on space: ["Bearer", "eyJ..."])
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Right now, we just acknowledge we got it (Verification comes in Stage 3!)
  return res.status(200).json({ message: 'Token received, but not verified yet!' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port} and connected to Supabase`);
});
