const Group = require('../models/Group');

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const newGroup = new Group({ name, members });
    await newGroup.save();
    res.status(201).json({ message: 'Group created successfully', group: newGroup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a group by ID
exports.getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json({ group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
