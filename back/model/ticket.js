const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
    {
        user_id: {type:Object, required:true},
        origin: {type:String, required:true},
        destination: {type:String, required:true},
        departureTime: {hour: Number, minute: Number},
        arrivalTime: {hour: Number, minute: Number},
        seat_reservation: {
            class: {type:Number, default:0},
            coach: {type:Number, default:0},
            seat: {type:Number, default:0}
        },
        food_reservation: [{
            food_id: {type:Object,default:null},
            quantity: {type:Number,default:0},
        }], //insert food_id
        route_price: {type:Number, default:0},
        reservation_price: {type:Number, default:0},
        food_price: {type:Number, default:0},
        total_price: {type:Number, default:0},

    }
)

module.exports = mongoose.model("ticket",ticketSchema)