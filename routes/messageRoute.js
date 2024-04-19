const express = require('express');
const  router = express.Router();
const {
    getAllMessages,
    createMessage
} = require('../controllers/messageCrud');

// Route to get all chat messages for a project
router.get('/:projectId/messages', getAllMessages);

// Route to create a new chat message for a project
router.post('/:projectId/messages', createMessage);



module.exports = router;