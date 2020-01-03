var DB = require('../config/db')
var mongoose = require('mongoose')

let taskSchema = new mongoose.Schema({
    created_on: {
        type: Date,
        default: Date.now()
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mentors',
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    }
})

let taskModel = DB.model('tasks', taskSchema)

module.exports = taskModel