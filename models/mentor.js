var DB = require('../config/db')
var mongoose = require('mongoose')

let mentorSchema = new mongoose.Schema({
    created_on: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

let mentorModel = DB.model('mentors', mentorSchema)

module.exports = mentorModel