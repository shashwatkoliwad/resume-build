const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');


router.post('/add', async(req, res) => {
  
try{
  // conshSync(req.body.password, hash)
  // console.log(req.body.password)
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

module.exports = router;