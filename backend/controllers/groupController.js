const Group = require("../models/Group");
const User = require("../models/User"); // Assuming you're using the User model to manage group members

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const newGroup = new Group({ name, members });
    await newGroup.save();
    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Join an existing group
exports.joinGroup = async (req, res) => {
  try {
    const { groupId } = req.body; // Assuming you're passing the group ID in the body
    const userId = req.user._id; // Assuming user is attached to the request via the auth middleware

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Add the user to the group members list if not already a member
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
      res.status(200).json({ message: "Joined group successfully", group });
    } else {
      res
        .status(400)
        .json({ message: "You are already a member of this group" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a group by ID
exports.getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.json({ group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
