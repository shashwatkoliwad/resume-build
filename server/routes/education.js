const express = require('express');
const router = express.Router()
const Education = require('../models/Education')

router.post('/add', async(req, res) => {
    try {
    let education = new Education(req.body)
    let user = await Education.find({user: req.user.id})
    if (user) {
    education.user = req.user.id
    let savedEducation = await education.save()
    res.send(savedEducation)
    }
    } catch(err) {
        console.error(err.message)
        res.send('Server error')
    }
 })

 router.delete('/delete', async(req,res) => {
     try {
         let education =await  Education.find({user: req.user.id})
        console.log('lol')
         if(education) {
             await Education.findOneAndDelete({id:req.body.id})
             res.send('education deleted')
         }
     } catch (err) {
         console.error(err.message)
         res.send('Sever error')
     }
 })

// update a doc
router.get('/edit', async(req, res) => {
    let educationFields = req.body
    try {
      let education = await Education.findById({ id: req.body.id })
      if (education) {
        let updatedEducation = await Education.findOneAndUpdate(
          {id:req.body.id},
          {$set: educationFields},
          {new: true}
        )
          res.json(updatedEducation)
  
      }
      res.send(education)
    } catch (err) {
      console.error(err.message)
      res.send('Sever error')
    }
  })


 module.exports = router