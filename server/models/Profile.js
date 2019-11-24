const mongoose = require('mongoose');
//const workSchema = require('./work')

const honorSchema = new mongoose.Schema({
    name: String,
    eventName: String,
    eventDate: Date,
    description: String
})

const certificateSchema = new mongoose.Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    instituteName: String,
    location: String,
    description: String
})

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
    },
    certifications: [certificateSchema],
    honors: [honorSchema]
})


module.exports = Profile = mongoose.model('profile', profileSchema)