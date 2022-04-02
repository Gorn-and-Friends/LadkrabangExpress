const userModel = require('../model/user.js')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const auth = require('../middleware/auth')


class User{
    static async register(req,res){
        try{

            console.log(req.body)

            const {fname,lname,fnameTH,lnameTH,email,uname,pword,bdate} =req.body

            if(!(fname && lname && fnameTH && lnameTH && email && uname &&pword && bdate)){
                res.status(400).send("All input required")
            }

            const oldUser = await userModel.findOne({ email })
            if(oldUser){
                return res.status(409).send("This user already exist. Please login")
            }
            const encrytedPassword = await bcrypt.hash(pword, 10)

            // const user = await userModel.create({
            //     first_name,
            //     last_name,
            //     email,
            //     pword: encrytedPassword
            // })
            
            const brithDate = new Date(bdate)
            const user = new userModel({
                first_name: fname,
                last_name: lname,
                thai_first_name: fnameTH,
                thai_last_name: lnameTH,
                email: email,
                username: uname,
                password: encrytedPassword,
                birthdate: brithDate,
            })

            const token = jsonwebtoken.sign(
                {user_id: user.id, email},
                process.env.TOKEN_KEY,
                {expiresIn: "2h"})

            user.token = token
            user.save()
            res.status(201).json(user)

        }catch(err){
            console.log(err)
        }
    }

    static async login(req,res){
        try{
            const { uname , pword} = req.body

            if(!(uname && pword)){
                res.status(400).send("All input required")
            }


            //check is user input username or email
            let user = Object
            if(uname.includes("@")){
                user = await userModel.findOne({ email: uname })
            }else{
                user = await userModel.findOne({ username: uname })
            }
            const email = user.email
            if(user && (await bcrypt.compare(pword,user.password))){
                const token = jsonwebtoken.sign(
                    {user_id: user._id, email},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    }
                )
                user.token = token
                res.status(200).json(user)
            }else{
                res.status(400).send("Invalid login")
            }
            
        

        }catch(err){
            console.log(err)
            res.send("error in backend")
        }
    }
}

module.exports = User