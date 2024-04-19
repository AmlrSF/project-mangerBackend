const Project = require('../schema/projects');
const Customer = require("../schema/customers");
const Message = require("../schema/customers");



// Get all projects
async function getAllProjects(req, res) {
  try {
    const projects = await Project.find()
      .populate({
        path: 'manager',
        model: Customer,
        select: 'firstName lastName email profileImage' // Specify the fields you want to select
      })
      .populate({
        path: 'members',
        model: Customer,
        select: 'firstName lastName email profileImage' // Specify the fields you want to select
      })
      
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new project
async function postProject(req, res) {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete all projects
async function deleteAllProjects(req, res) {
  try {
    await Project.deleteMany();
    res.json({ message: 'All projects deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single project by ID
async function getSingleProject(req, res) {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate({
      path: 'manager',
      model: Customer,
      select: 'firstName lastName email profileImage' // Specify the fields you want to select
    })
    .populate({
      path: 'members',
      model: Customer,
      select: 'firstName lastName email profileImage' // Specify the fields you want to select
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a single project by ID
async function updateSingleProject(req, res) {
  try {
    const projectId = req.params.id;
    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a single project by ID
async function deleteSingleProject(req, res) {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProjects,
  postProject,
  deleteAllProjects,
  getSingleProject,
  updateSingleProject,
  deleteSingleProject
};
