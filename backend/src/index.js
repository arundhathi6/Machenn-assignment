require('dotenv').config();
const express = require("express");
const connection = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require("cors");

const app = express();

// Database Connection
connection();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

const port = process.env.PORT || 8080 
app.listen(port, () => console.log(`Listening on port ${port}...`))