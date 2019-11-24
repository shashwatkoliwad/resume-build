const mongoose = require('mongoose');
const workSchema = require('./work')

const resumeSchema = new mongoose.Schema({
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
    work: [workSchema],
    education:[educationSchema],
    certifications: [certificateSchema],
    honors: [honorSchema]
})

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    location: {
        type: String
    }

})

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

module.exports = Resume = mongoose.model('resume', resumeSchema)