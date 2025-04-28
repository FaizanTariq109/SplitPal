const Chore = require('../models/Chore');

// Add a chore
exports.addChore = async (req, res) => {
  try {
    const { userId, groupId, name, dueDate } = req.body;
    const chore = new Chore({ userId, groupId, name, dueDate });
    await chore.save();
    res.status(201).json({ message: 'Chore added successfully', chore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get chores for a group
exports.getChores = async (req, res) => {
  try {
    const { groupId } = req.query; // Get from query instead of params
    const chores = await Chore.find({ groupId });
    res.json({ chores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update chore status (complete/incomplete)
exports.updateChoreStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const chore = await Chore.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );

    if (!chore) {
      return res.status(404).json({ message: 'Chore not found' });
    }

    res.json({ message: 'Chore updated', chore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
