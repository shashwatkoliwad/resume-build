const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile')


router.post('/update', async(req, res) => {
    const {
        imgPath,
        highlights,
        profileOverview,
    } = req.body

    const profileFields = {}
    if (imgPath) profileFields.imgPath = imgPath
    if (highlights) {
        profileFields.highlights = highlights.split(",").map(skill => skill.trim())
    }
    if (profileOverview) profileFields.profileOverview = profileOverview
    console.log(profileFields)
    try {
        
            let profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true, upsert: true}
            )
            return res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.send('Server error')
    }
 })





 module.exports = router