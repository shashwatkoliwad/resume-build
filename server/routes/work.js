const express = require('express');
const router = express.Router()
const Work = require('../models/work')

router.post(
    '/add',
    async (req, res) => {
  
      const {
        title,
        companyName,
        startDate,
        endDate,
        location,
        description,
        projects
      } = req.body;
  
      // Build profile object
      const workFields = {};
    
      if (title) workFields.title = title
      if (companyName) workFields.companyName = companyName
      if (startDate) workFields.startDate = startDate
      if (endDate) workFields.endDate = endDate
      if (location) workFields.location = location
      if (description) workFields.description = description
      if (projects) workFields.projects = projects
  
      try {
        let work = await Work.findOne({ user: req.user.id });
  
        //Create
        work = new Work(workFields);
        work.user = req.user.id
        await work.save();
        res.json(work);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  router.delete('/delete', async(req,res) => {
    try {
        let work =await  Work.find({user: req.user.id})
       console.log('lol')
        if(work) {
            await Work.findOneAndDelete({id:req.body.id})
            res.send('work is deleted')
        }
    } catch (err) {
        console.error(err.message)
        res.send('Sever error')
    }
})


  
  module.exports = router