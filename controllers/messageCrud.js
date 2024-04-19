const Project = require('../schema/projects');
const Message = require('../schema/message');

const Customer = require("../schema/customers");


const getAllMessages = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate({
      path: 'chatMessages',
      populate: {
        path: 'sender',
        model:Customer,
        select: 'firstName lastName profileImage' // Select the fields you want to populate
      }
    });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project.chatMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const createMessage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { text, sender } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const message = new Message({ text, sender });
    await message.save();
    project.chatMessages.push(message);
    await project.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createMessage,
  getAllMessages
};
  