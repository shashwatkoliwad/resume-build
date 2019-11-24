const mongoose = require("mongoose")
const config = require("config")
const db = config.get("mongoURI")


const connectDB = async () => {
    try{
        const mongodbSrv = process.env.mongodbSrv || "localhost"
        await mongoose.connect('mongodb://' + mongodbSrv + ':27017/resumedb',  {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          })
    
    console.log("MngoDB connected")
    } catch(err) {
        console.error(err.message)
        process.exit(1)
    }

}

module.exports = connectDB