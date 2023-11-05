const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const userRole = role || 'user';
        const existingUser = await User.findOne({ email });
        if (!username || !email || !password ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role: userRole });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, process.env.SECRET_KEY);
            return res.status(200).json({ message: 'Authentication successful', token, user });
        } else {
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
