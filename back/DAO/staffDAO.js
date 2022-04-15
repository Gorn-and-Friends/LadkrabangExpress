const ticketModel = require('../model/ticket.js')
const userModel = require('../model/user.js')
const mongoose = require('mongoose')


class Staff{
    
    static showReservTicket(req,res){
        //ใช้กับหน้า staff เพื่อแสดงตั๋วที่ทำการจองที่นั่งทั้งหมดในขบวนนั้น
        const { trainNumber , date , trainClass} =req.body
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