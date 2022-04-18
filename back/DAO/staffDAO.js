const ticketModel = require('../model/ticket.js')
const userModel = require('../model/user.js')
const mongoose = require('mongoose')
const Ticket = require("./ticketDAO.js")


class Staff{
    
    static async showReservTicket(req,res){
        try {
            //ใช้กับหน้า staff เพื่อแสดงตั๋วที่ทำการจองที่นั่งทั้งหมดในขบวนนั้น
            const { trainNumber , date , trainClass} =req.body

            const d = new Date(date)

            console.log(d)

            const foundTicket = await ticketModel.find({$and:[{"train_number" : String(trainNumber)}, {"date" : d}]})
            console.log(foundTicket)
            let result = []

            for (let i = 0 ; i<foundTicket.length ; i++) {
                const userID = foundTicket[i].user_id
                // const objID = mongoose.Types.ObjectId(strID)
                const foundUser = await userModel.findById(userID)
                
                let temp = foundTicket[i].toObject()
                // เพิ่ม fields
                temp.firstname = foundUser.firstname
                temp.lastname = foundUser.lastname

                result.push(temp)
            }

            // const trainTemp = await ticketModel.findOne({"train_number" : String(trainNumber)})
            // console.log(trainID)
            // const d = new Date(date)
            // const foundTicket = await Ticket.findReservedSeat(trainTemp.train_id, d)
            // console.log(foundTicket)

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
}

module.exports = Staff