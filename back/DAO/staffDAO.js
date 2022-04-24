const ticketModel = require('../model/ticket.js')
const userModel = require('../model/user.js')
const staffModel = require('../model/staff.js')
const mongoose = require('mongoose')
const Ticket = require("./ticketDAO.js")
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

class Staff{
    
    static async showReservTicket(req,res){
        try {
            //ใช้กับหน้า staff เพื่อแสดงตั๋วที่ทำการจองที่นั่งทั้งหมดในขบวนนั้น
            const { trainNumber , date , trainClass} =req.body

            const d = new Date(date)

            const foundTicket = await ticketModel.find({$and:[{"train_number" : String(trainNumber)}, {"date" : d}]})

            let result = []
            for (let i = 0 ; i<foundTicket.length ; i++) {
                const userID = foundTicket[i].user_id
                const foundUser = await userModel.findById(userID)
                let isAddedFood = false
                for(let j = 0 ; j < foundTicket[i].seat_reservation.length ; j++){

                    console.log(foundTicket[i].train_number)
                    let isReservSeat = true
                    console.log(foundTicket[i].seat_reservation)
                    if(foundTicket[i].seat_reservation[j].coach === null && foundTicket[i].seat_reservation[j].row === null && foundTicket[i].seat_reservation[j].column === null){
                        isReservSeat = false
                    }

                    let tempFood = []
                    if(foundTicket[i].food_reservation.length > 0 && isAddedFood === false){
                        tempFood = foundTicket[i].food_reservation
                        isAddedFood = true
                    }

                    const temp = {
                        "ticketID": String(foundTicket[i]._id),
                        "firstname": foundUser.firstname, 
                        "lastname": foundUser.lastname, 
                        "origin": foundTicket[i].origin, 
                        "destination": foundTicket[i].destination, 
                        "class": foundTicket[i].reservation_class, 
                        "coach": foundTicket[i].seat_reservation[j].coach, 
                        "row": foundTicket[i].seat_reservation[j].row, 
                        "column": foundTicket[i].seat_reservation[j].column, 
                        "food": tempFood,
                        "isReservSeat": isReservSeat
                    }
                    result.push(temp)
                }  
            }

            res.send(result)
        }catch (err){
            console.log(err)
            res.send("Error on backend")
        }
    }

    static async showTicket(req,res){
        try{
            let ticketID = req.params.id
            if(!ticketID){
                res.send("Please enter ID").status(400)
            }
            
            ticketID = mongoose.Types.ObjectId(ticketID)
            let foundTicket = await ticketModel.findById(ticketID)

            if(!foundTicket){
                res.send("Ticket not found").status(404)
            }else{
                // let temp = mongoose.Types.ObjectId()
                const userFound = await userModel.findById(foundTicket.user_id)
                
                foundTicket.toObject().username = userFound.username
                res.send(foundTicket).status(200)
            }
            
        }catch(err){
            console.log(err)
            res.send("Error in backend").status(400)
        }
        
    }

    static async register(req,res){
        try{

            console.log(req.body)

            const {firstname,lastname,email,username,password} = req.body

            if(!(firstname && lastname && email && username && password)){
                res.status(400).send("All input required")
            }

            const oldStaff = await staffModel.findOne({ email })

            if(oldStaff){
                return res.status(409).send("This staff already exist. Please login")
            }
            const encrytedPassword = await bcrypt.hash(password, 10)
            
            // const brithDate = new Date(birthdate)
            const staff = new staffModel({
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: encrytedPassword
            })

            const token = jsonwebtoken.sign(
                {staff_id: staff.id, email},
                process.env.TOKEN_KEY,
                {expiresIn: "2d"})

            staff.token = token
            staff.save()

            res.status(201).json(staff)

        }catch(err){
            console.log(err)
        }
    }

    static async login(req,res){
        try{
            const { username , password} = req.body

            if(!(username && password)){
                res.status(400).send("All input required")
            }

            //check is user input username or email
            let staff = Object
            if(username.includes("@")){
                staff = await staffModel.findOne({ email: username })
            }else{
                staff = await staffModel.findOne({ username: username })
            }

            if(staff === null){
                res.status(400).send("username not found")
                return
            }
            console.log(staff)
            const email = staff.email

            if(staff && (await bcrypt.compare(password,staff.password))){
                const token = jsonwebtoken.sign(
                    {staff_id: staff._id, email},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2d"
                    }
                )
                staff.token = token
                res.status(200).json(staff)
            }else{
                res.status(400).send("Invalid login")
            }
        }catch(err){
            console.log(err)
            res.send("error in backend")
        }
    }

    static verifyTokenGetUserID(token){
        try{
            const decoded = jsonwebtoken.verify(token, process.env.TOKEN_KEY)
            // console.log(decoded)
            return decoded.staff_id
        }catch(err){
            return false
            console.log(err)

        }
    }

}

module.exports = Staff