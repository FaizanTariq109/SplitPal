const Expense = require('../models/Expense');

// Add an expense
exports.addExpense = async (req, res) => {
  try {
    const { userId, groupId, amount, description, date } = req.body;
    const expense = new Expense({ userId, groupId, amount, description, date });
    await expense.save();
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get expenses for a group
exports.getExpenses = async (req, res) => {
  try {
    const { groupId } = req.query; // ← Corrected: from query, not params
    const expenses = await Expense.find({ groupId });
    res.json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
