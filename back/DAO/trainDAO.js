const trainModel = require('../model/train.js')
const mongoose = require('mongoose')

class Train{
    static async add(req,res){
        try{
            // console.log(req.body)
            const service_date = new Date(req.body.service_date)
            const trainAdded = new trainModel({
                train_number : req.body.train_number,
                train_name : req.body.train_name,
                stand_ticket_available: req.body.stand_ticket_available,
                service_date: service_date,
                service_day: req.body.service_day,
                class_in_train: {
                    class_1: {
                        class_available: req.body.class_in_train.class_1.class_available,
                        remain_seat: req.body.class_in_train.class_1.remain_seat
                    },
                    class_2: {
                        class_available: req.body.class_in_train.class_2.class_available,
                        remain_seat: req.body.class_in_train.class_2.remain_seat
                    },
                    class_3: {
                        class_available: req.body.class_in_train.class_3.class_available,
                        remain_seat: req.body.class_in_train.class_3.remain_seat
                    },
                } ,
                
            })
            const tempStation = []
            for(let i of req.body.station){
                tempStation.push(i)
            }
            trainAdded.station = tempStation
            trainAdded.save()
            res.send("Sucess")
        }catch(err){
            console.log(err)
            res.send("error")
        }
        
    }
    //query
    static async customerFindTrain(req,res){
        try{
            console.log(req.body.origin_station)
            const foundStation = await trainModel.find({"station.station_name" : req.body.origin_station})
            if(foundStation.length > 0){
                res.send(foundStation)
            }else{
                res.send("not found")
            }
            
        }catch(err){
            console.log(err)
            res.send("error")
        }

    }

    static async test(req,res){
        try{
            console.log(req.body)
            res.send("Good")
        }catch(err){
            console.log(err)
            res.send("error")
        }

    }
}

module.exports = Train
