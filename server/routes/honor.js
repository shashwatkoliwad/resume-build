const express = require('express');
const router = express.Router()
const Honor = require('../models/Honor')

router.post('/add', async(req, res) => {
    try {
    let honor = new Honor(req.body)
    let user = Honor.find({user: req.user.id})
    if (user) {
    honor.user = req.user.id
    let savedHonor = await honor.save()
    res.send(savedHonor)
    }
    } catch(err) {
        console.error(err.message)
        res.send('Server error')
    }
 })

 module.exports = router