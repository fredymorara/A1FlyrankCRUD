import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Load and serve Swagger UI
const openapiDocument = JSON.parse(fs.readFileSync(new URL('./openapi.json', import.meta.url)));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

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

// --- STAGE 4: MIDDLEWARE GUARD ---
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  // Attach the user and token to the request so the next route can use it
  req.user = data.user;
  req.token = token;
  
  // The guard says "You may pass!"
  next();
};

// 3. Log Out Route (Protected)
app.post('/auth/logout', requireAuth, async (req, res) => {
  // Call the Supabase SDK sign out method
  await supabase.auth.signOut();
  
  return res.status(204).send();
});

// Protected Route (Cleaned up using Middleware)
app.get('/protected/profile', requireAuth, (req, res) => {
  // We no longer need to check the token here, the middleware already did it!
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    created_at: req.user.created_at
  });
});

// A second protected route to prove the middleware is reusable
app.get('/protected/dashboard', requireAuth, (req, res) => {
  return res.status(200).json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port} and connected to Supabase`);
});
