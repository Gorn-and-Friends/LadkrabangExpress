const mongoose = require('mongoose')
const ticketModel = require('../model/ticket.js')

class Ticket{
    static async addTicket(req,res){
        const { user_id, origin} =req.body
        ticketModel.find(user_id)
    }
}
