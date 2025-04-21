const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./backend/config/db');
const authRoutes = require('./backend/routes/authRoutes');
const birthdayRoutes = require('./backend/routes/birthdayRoutes');
const chatRoutes = require('./backend/routes/chatRoutes');
const choreRoutes = require('./backend/routes/choreRoutes');
const expenseRoutes = require('./backend/routes/expenseRoutes');
const groupRoutes = require('./backend/routes/groupRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/birthdays', birthdayRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/chores', choreRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/groups', groupRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});