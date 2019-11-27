const mongoose = require('mongoose')

const honorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: String,
    eventName: String,
    eventDate: Date,
    description: String
})

module.exports = Honor = mongoose.model('honor', honorSchema)
