const mongoose = require('mongoose')

const certificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: String,
    startDate: Date,
    endDate: Date,
    instituteName: String,
    location: String,
    description: String
})

module.exports = Certificate = mongoose.model('certificate', certificateSchema)