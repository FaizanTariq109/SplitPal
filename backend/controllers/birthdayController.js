const Birthday = require('../models/Birthday');
const moment = require('moment');

// Add a birthday
exports.addBirthday = async (req, res) => {
  try {
    const { userId, name, date } = req.body;
    const birthday = new Birthday({ userId, name, date });
    await birthday.save();
    res.status(201).json({ message: 'Birthday added successfully', birthday });
  } catch (err) {
    console.error('Error adding birthday:', err); // Log the error
    res.status(500).json({ message: 'Server error while adding birthday' });
  }
};

// Get upcoming birthdays
exports.getUpcomingBirthdays = async (req, res) => {
  try {
    const birthdays = await Birthday.find();
    const upcomingBirthdays = birthdays.filter(birthday => moment(birthday.date).isAfter(moment()));
    res.json({ upcomingBirthdays });
  } catch (err) {
    console.error('Error fetching upcoming birthdays:', err); // Log the error
    res.status(500).json({ message: 'Server error while fetching upcoming birthdays' });
  }
};
