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

 router.delete('/delete', async(req,res) => {
    try {
        let certificate =await  Certificate.find({user: req.user.id})
       console.log('lol')
        if(certificate) {
            await Certificate.findOneAndDelete({id:req.body.id})
            res.send('certificate deleted')
        }
    } catch (err) {
        console.error(err.message)
        res.send('Sever error')
    }
})

// update a doc
router.get('/edit', async(req, res) => {
    let certificateFields = req.body
    try {
      let certificate = await Certificate.findById({ id: req.body.id })
      if (certificate) {
        let updatedCertificate = await Certificate.findOneAndUpdate(
          {id:req.body.id},
          {$set: certificateFields},
          {new: true}
        )
          res.json(updatedCertificate)
  
      }
      res.send(certificate)
    } catch (err) {
      console.error(err.message)
      res.send('Sever error')
    }
  })

 module.exports = router