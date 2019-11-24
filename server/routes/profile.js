const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile')

const User = require('../models/User');

router.post('/update', async(req, res) => {
    const {
        imgPath,
        highlights,
        profileOverview,
        certifications,
        honors
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.email
    if (imgPath) profileFields.imgPath = imgPath
    if (highlights) {
        profileFields.highlights = highlights.split(",").map(skill => skill.trim())
    }
    if (profileOverview) profileFields.profileOverview = profileOverview
    if (certifications) profileFields.certifications = certifications
    if (honors) profileFields.certifications.honors = honors
    
    try {
        let profile = await Profile.findOne({ email: req.user.email})
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                {email: 'req.user.email'},
                {$set: profileFields},
                {new: true}
            )

            return res.json(profile)
        }
        console.log('come one')
        profileFields.user = "koliwad96@gmail.com"
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
        console.log('lol')
    } catch(err) {
        console.error(err.message)
        res.send('Server error')
    }
 })

 module.exports = router