const express = require("express")
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const cors = require("cors")

const app = express()

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

//routes
app.use('/user', require('./routes/auth'))

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));