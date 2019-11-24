const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: [true, "Title is required"] 
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"]
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"]
    },
    endDate: {
        type: Date,
        default: "Current"
    },
    location: {
        type: String,
        required: [true, "location is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    projects: [projectSchema]

})

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    appLink: {
        type: String,
        required: true
    },
    projectStartDate: {
        type: Date,
        required: [true, "Start date is required"]
    }, 
    projectendDate: {
        type: Date,
        required: [true, "End date is required"]
    }, 
    projectDescription: {
        type: String,
        required: true
    }
})

module.exports = Work = mongoose.model('work', workSchema)