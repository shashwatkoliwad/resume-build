const express = require('express');
const router = express.Router()
const Certificate = require('../models/Certificate')

router.post('/add', async(req, res) => {

    
    try {
    let certificate = new Certificate(req.body)
    let user = Certificate.find({user: req.user.id})
    if (user) {
    certificate.user = req.user.id
    let savedCertificate = await certificate.save()
    res.send(savedCertificate)
    }
    } catch(err) {
        console.error(err.message)
        res.send('Server error')
    }
 })

 module.exports = router