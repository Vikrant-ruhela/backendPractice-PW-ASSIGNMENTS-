const mongoose = require('mongoose')

//here we will connect our mongoose database
const dbConnection = async function () {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected");
    } catch (err) {
        console.log("DB connection error");
    }
}

module.exports = dbConnection