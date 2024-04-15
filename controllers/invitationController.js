const Invitation = require('../schema/invitation');
const Project = require('../schema/projects');

// Get all invitations
async function getAllInvitations(req, res) {
  try {
    const invitations = await Invitation.find();
    res.json(invitations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new invitation
async function createInvitation(req, res) {
  try {
    const { project, sender, recipient, status } = req.body;
    const newInvitation = new Invitation({ project, sender, recipient, status });
    const savedInvitation = await newInvitation.save();
    res.status(201).json(savedInvitation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Accept an invitation
async function acceptInvitation(req, res) {
    try {
      const invitationId = req.params.id;
      
      // Find the invitation
      const invitation = await Invitation.findById(invitationId);
      if (!invitation) {
        return res.status(404).json({ message: 'Invitation not found' });
      }
  
      // Update the invitation status to 'accepted'
      invitation.status = 'accepted';
      await invitation.save();
  
      // Update the project's members
      const projectId = invitation.project;
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      console.log(project);

      // Add the recipient (user who accepted the invitation) to the members array
      project.members.push(invitation.recipient);
      await project.save();
  
      res.json({ message: 'Invitation accepted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

// Reject an invitation
async function rejectInvitation(req, res) {
  try {
    const invitationId = req.params.id;
    const updatedInvitation = await Invitation.findByIdAndUpdate(invitationId, { status: 'rejected' }, { new: true });
    res.json(updatedInvitation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllInvitations,
  createInvitation,
  acceptInvitation,
  rejectInvitation
};
