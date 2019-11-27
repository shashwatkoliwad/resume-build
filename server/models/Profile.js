const mongoose = require('mongoose');
//const workSchema = require('./work')


const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    imgPath: {
        type: String
    },
    highlights: {
        type: [String],
        required: true
    },
    profileOverview: {
        type: String,
        required: true
    }
})


module.exports = Profile = mongoose.model('profile', profileSchema)