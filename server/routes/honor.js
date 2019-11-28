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

 // update a doc
router.get('/edit', async(req, res) => {
    let honorFields = req.body
    try {
      let honor = await Honor.findById({ id: req.body.id })
      if (honor) {
        let updatedHonor = await Honor.findOneAndUpdate(
          {id:req.body.id},
          {$set: honorFields},
          {new: true}
        )
          res.json(updatedHonor)
  
      }
      res.send(honor)
    } catch (err) {
      console.error(err.message)
      res.send('Sever error')
    }
  })

 module.exports = router