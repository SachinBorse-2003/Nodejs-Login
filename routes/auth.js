import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import handleChatbot from './chatbot.js';
import handleChatbotM from './chatbotm.js'


const router = express.Router();

router.post('/chat',handleChatbot)
router.post('/chatm',handleChatbotM)
// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert a new user
    await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length === 0) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user[0].password);

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
router.post('/organdonation', async (req, res) => {
  try {
    const {
      full_name,
      phone_no,
      organ,
      donated,
      disease,
      state,
      city,
      birthdate,
      medical_conditions,
      allergies,
      medications,
      email,
      address,
    } = req.body;

    const query = `INSERT INTO organdonation 
                   (full_name,phone_no, organ, donated, disease, state, city, birthdate, medical_conditions, allergies, medications, email, address)
                   VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await pool.query(query, [
      full_name,
      phone_no,
      organ,
      donated,
      disease,
      state,
      city,
      birthdate,
      medical_conditions,
      allergies,
      medications,
      email,
      address,
    ]);

    res.status(201).json({ msg: 'Organ donation details added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
router.get('/blooddonation', async (req, res) => {
  try {
    const {
      name,
      blood_type,
      contact_number,
      state,
      city,
      recent_donation,
      has_disease,
      birth_date,
    } = req.body;

    const sql = `INSERT INTO blood_donors 
                 (name, blood_type, contact_number, state, city, recent_donation, has_disease, birth_date)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    await pool.query(sql, [
      name,
      blood_type,
      contact_number,
      state,
      city,
      recent_donation,
      has_disease,
      birth_date,
    ]);

    res.status(201).json({ msg: 'Blood donation details added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
router.get('/organdonationfetch', async (req, res) => {
  try {
    const results = await pool.query('SELECT * from organdonation');
    res.status(200).json(results[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/blooddonationfetch', async (req, res) => {
  try {
    const results = await pool.query('SELECT * from blood_donors');
    res.status(200).json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
router.post('/hospital/signup', async (req, res) => {
  try {
    const { username, phone, password, name, city } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert a new hospital
    await pool.query('INSERT INTO hospital (username, phone, password, name, city) VALUES (?, ?, ?, ?, ?)', [username, phone, hashedPassword, name, city]);

    res.status(201).json({ msg: 'Hospital registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/hospital/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the hospital exists
    const [hospital] = await pool.query('SELECT * FROM hospital WHERE username = ?', [username]);

    if (hospital.length === 0) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, hospital[0].password);

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ hospitalId: hospital[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

export default router;
