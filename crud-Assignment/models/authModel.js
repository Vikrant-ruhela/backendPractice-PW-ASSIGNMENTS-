const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        max: [30, "name should under 30 characters"],
        required: [true, "name field can't be empty"]
    },
    email: {
        type: String,
        unique: [1, "Email must be unique"],
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        min: [8, "Password must be atleast 8 charcters long"],
        select: false,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("authModel", authSchema)