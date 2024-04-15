
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    title: String,
    description: String,
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});


const Project = mongoose.model('Project', projectSchema);

module.exports =  Project
