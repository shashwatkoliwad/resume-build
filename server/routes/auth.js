const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const Honor = require('../models/Honor')
const Certificate = require('../models/Certificate')
const Education = require('../models/Education')
const Profile = require('../models/Profile')
const Work = require('../models/Work')


router.post('/add', async(req, res) => {
  
try{
  let user = new User(req.body)
  
  user.save()
    .then(user =>{
      savedUser = user.toJSON()
      res.send(savedUser)
    })
} catch(err) {
  console.error(err.message)
}
})

router.post(
  '/login',
  async (req, res) => {
    
    const {email,password} = req.body
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
        
          res.send(token)
        }
      );
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
);

//get the user resume
router.get('/resume', async(req, res) => {
 try {
    let userDetails = {}
    let profile = await Profile.find({ user: req.user.id })
    userDetails.profile = profile
    let work = await Work.find({ user: req.user.id })
    userDetails.work = work
    let honor = await Honor.find({ user: req.user.id })
    userDetails.honor = honor
    let certificate = await Certificate.find({ user: req.user.id })
    userDetails.certificate = certificate
    let education = await Education.find({ user: req.user.id })
    userDetails.education = education

    res.json(userDetails)
  } catch(err) {
    console.error(err.message)
    res.status(500).send("server error")
  }
})


module.exports = router;