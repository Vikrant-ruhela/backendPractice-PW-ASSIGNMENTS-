const authModel = require("../models/authModel")
const validator = require("email-validator");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//home function on route("/")
function home(req, res) {
    res.send("hello from auth server")
}

//user registration function 
async function register(req, res) {
    try {

        //extract data from req.body
        const { name, email, password, confirmPassword } = req.body

        //check that everything should be present
        if (!(name && email && password && confirmPassword)) {
            throw new Error("All fields are required")
        }

        //finding user in database
        const userExists = await authModel.findOne({ email: email })

        //if user already exists then it should login not to register
        if (userExists) {
            throw new Error("User already have an account")
        }

        //if password is not equal to confirm password throw an error
        if (password !== confirmPassword) {
            throw new Error("Password and confirm password doesn't matches")
        }

        //validate the email with its proper syntax
        if (!(validator.validate(`${email}`))) {
            throw new Error("Enter valid email")
        }

        //password length must be more than 8 characters
        if (password.length <= 8) {
            throw new Error("password must be 8 letters long")
        }

        //hashing password 
        const hashPassword = bcrypt.hashSync(password, 11)
        const User = await authModel.create({ name: name, email: email, password: hashPassword })

        //sending response
        res.status(200).json({
            success: true,
            message: "User registraction is successfull",
            message: User
        })

    } catch (err) {
        //if there is any error in above checks then this catch statement will catch the error
        console.log(err.message)
        res.status(400).json({
            success: false,
            message: "User registration failed",
            error: err.message
        })
    }

}

//login
async function login(req, res) {
    try {
        //extract email and password 
        const { email, password } = req.body

        //finding user in database
        const User = await authModel.findOne({ email: email }).select('password')

        //throw an error if user doesn't exist in db
        if (!User) {
            throw new Error("User doesn't exist")
        }

        //varify hashed password throw npm package bcrypt
        const verifyPassword = await bcrypt.compare(password, User.password)
        if (!verifyPassword) {
            throw new Error("invalid password")
        }

        //generating jwt token for authorization
        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '3h'
        })

        //sending jwt token inside cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).status(200).json({
            success: "true",
            message: "User login successfully"
        })

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: "User login failed",
            error: error.message
        })
    }

}




//exporting all the functions
module.exports = {
    home,
    register,
    login
}