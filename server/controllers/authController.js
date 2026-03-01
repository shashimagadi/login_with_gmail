const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user (password is hashed by the model middleware)
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { id: user._id, name: user.name }
    });

  } catch (error) {
    console.log("Error in registerUser:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};





exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // ... (Verify user and password as we did before) ...
    if (!user) {
      return res.status(401).json({ message: 'user not found ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
     console.log("l0gin  data:", user, isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
   

    const accessToken = jwt.sign(
      { id: user._id }, 
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { id: user._id }, 
      process.env.REFRESH_TOKEN_SECRET, 
      { expiresIn: '7d' }
    );

     // Set Refresh Token and access Token in an HTTP-only Cookie

     res.cookie('accessToken', accessToken, {
      httpOnly: true,    // Prevents JS access (XSS protection)
      secure: false,     // Set to true in production (HTTPS)
      sameSite: 'Lax',   
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

   
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,    // Prevents JS access (XSS protection)
      secure: false,     // Set to true in production (HTTPS)
      sameSite: 'Lax',   // Protects against CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send Access Token in response body
    res.status(200).json({
      success: true,
      accessToken, 
      user: { id: user._id, name: user.name }
    });

  } catch (error) {
    console.log("Error in loginUser:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken; // Read from cookies

  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id }, 
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

exports.logoutUser = (req, res) => {
  // 1. Clear the Access Token cookie
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'Lax',
  });

  // 2. Clear the Refresh Token cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  });

  res.status(200).json({ 
    success: true, 
    message: 'Logged out and cookies cleared' 
  });
};