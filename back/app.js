const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const memberRouter = require('./router/memberRoute')

dotenv.config()
require('./config/database.js').connect()

const app = express()
app.use(cors())
app.use(express.json())

const User = require('./model/user.js')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const auth = require('./middleware/auth')

app.use("/api", memberRouter)
// app.use("/api", (req,res) => console.log(req.body))

//Registor
app.post("registor",async (req,res)=>{
    try{

        const { firstname,lastname,email } = req.body
        console.log(firstname + lastname + email)
        // const { first_name , last_name , email , password} = req.body

        // if(!(email && password && first_name && last_name)){
        //     res.status(400).send("All input required")
        // }
        
        // const oldUser = await User.findOne({ email })
        // if(oldUser){
        //     return res.status(409).send("This user already exist. Please login")
        // }
        // encrytedPassword = await bcrypt.hash(password, 10)

        // const user = await User.create({
        //     first_name,
        //     last_name,
        //     email,
        //     password: encrytedPassword
        // })

        // const token = jsonwebtoken.sign(
        //     {user_id: user.id, email},
        //     process.env.TOKEN_KEY,
        //     {expiresIn: "2h"}
        // )

        // user.token = token
        // res.status(201).json(user)

    } catch(err){
        console.log(err)
    }
})

app.post("/login",async (req,res)=>{
    try{
        const { email,password} = req.body
        if(!(email && password)){
            res.status(400).send("All input required")
        }

        const user = await User.findOne({ email })

        if(user && (await bcrypt.compare(password,user.password))){
            const token = jsonwebtoken.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )
            user.token = token
            res.status(200).json(user)
        }
        res.status(400).send("Invalid login")
        

    }catch(err){
        console.log(err)
    }
})

app.post('/welcome', auth , (req,res)=>{
    res.status(200).send("Welcome")
})


module.exports = app