const express = require('express');

const router = express.Router();
const {
    getAllProjects,
    postProject,
    deleteSingleProject,
    getSingleProject,
    updateSingleProject,
    deleteAllProjects
} = require('../controllers/projectsCrud');

router.route('/')
    .get(getAllProjects)
    .post(postProject)
    .delete(deleteAllProjects)

router.route('/Project/:id')
    .delete(deleteSingleProject)
    .get(getSingleProject)
    .put(updateSingleProject)


module.exports = router