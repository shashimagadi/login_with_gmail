const express = require('express');
const router = express.Router();
const { registerUser,loginUser,refreshToken,logoutUser } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Endpoint: POST /api/auth/register
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout',logoutUser);

// 1. User clicks "Login with Google" and hits this
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 2. Google redirects back to this
router.get('/google/callback', 
  passport.authenticate('google', { 
    session: false,
// If the user is NOT found in the database (done(null, false)),
    // Passport will automatically send them to this URL instead of the success block.
    failureRedirect: 'http://localhost:3000/auth/login?error=account_not_found' }), 
  (req, res) => {
    // Generate YOUR system's tokens
    const accessToken = jwt.sign({ id: req.user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: req.user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    // Set them in cookies so the browser remembers the user
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: false, sameSite: 'Lax' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'Lax' });

    // Send user to the frontend dashboard
    res.redirect('http://localhost:3000/dashboard/home');
  }
);

module.exports = router;