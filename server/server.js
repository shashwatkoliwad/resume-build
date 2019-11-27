const express = require("express")
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const cors = require("cors")

const app = express()

const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
const workRoute = require('./routes/work')
const educationRoute = require('./routes/education')
const certificateRoute = require('./routes/certificate')
const honorRoute = require('./routes/honor')

connectDB()

// const mongodbSrv = process.env.mongodbSrv || 5000
// mongoose.connect('mongodb://' + mongodbSrv + ':27017/resumedb', {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// mongoose.connection.on('error', function (err) {
//   console.error('Failed to Connect MongoDB', err);
// });

// mongoose.connection.on('disconnected', function () {
//   console.log('MongoDB Disconnected');
// });

// mongoose.connection.on('connected', function () {
//   console.log('MongoDB Connected');
// });

app.use(cors())
app.use(express.json({ extended: false}))

app.get('/', (req, res) => res.send('API running'))

app.use(async (req, res, next) => {

    // In case of testing
    if (!req.user) {
      req.user = {
        ...req.user,
        name: 'Shashwat',
        id:"5ddcc2de9a331fa68abab706",
        email: "test@gmail.com"
      }
    }
    res.append('username', req.user.email)
    res.append('name',req.user.name )
    next()
});
  

//routes
app.use('/user', authRoute)
app.use('/profile', profileRoute)
app.use('/work', workRoute)
app.use('/education', educationRoute)
app.use('/honor', honorRoute)
app.use('/certificate', certificateRoute)

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app