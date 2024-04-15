const express = require('express');
const router = express.Router();
const {
    getAllInvitations,
    createInvitation,
    acceptInvitation,
    rejectInvitation
} = require('../controllers/invitationController');

router.route('/')
    .get(getAllInvitations)
    .post(createInvitation);

router.route('/:id/accept')
    .put(acceptInvitation);

router.route('/:id/reject')
    .put(rejectInvitation);

module.exports = router;
