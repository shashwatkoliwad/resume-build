const express = require('express');
const router = express.Router()
const Work = require('../models/work')

router.post(
    '/update',
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        title,
        companyName,
        startDate,
        endDate,
        location,
        description,
        project
      } = req.body;
  
      // Build profile object
      const workFields = {};
      workFields.user = req.user.id
      if (title) workFields.title = title
      if (companyName) workFields.companyName = companyName
      if (startDate) workFields.startDate = startDate
      if (endDate) workFields.endDate = endDate
      if (location) workFields.location = location
      if (description) workFields.description = description
      if (project) workFields.project = project
  
      try {
        let work = await Work.findOne({ user: req.user.id });
  
        if (work) {
          // Update
          work = await Work.findOneAndUpdate(
            { user: req.user.id },
            { $set: workFields },
            { new: true }
          );
  
          return res.json(profile);
        }
  
        // Create
        work = new Work(workFields);
  
        await work.save();
        res.json(work);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  module.exports = router