const trainModel = require('../model/train.js')
const mongoose = require('mongoose')

class Train{
    static async add(req,res){
        try{
            // console.log(req.body)
            const service_date = Object
            if(req.body.service_date != null){
                service_date = new Date(req.body.service_date)
            }
            
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

    static async customerFindTrain(req,res){
        //ใช้กับหน้า find your best train
        //input => origin, destination, departure_time, date, time, number_of_passenger, return_date, return_time
        try{
            const { origin, destination, departure_time, date, time, number_of_passenger, return_date, return_time } = req.body

            // const foundStation = await trainModel.find({"station.station_name" : req.body.origin_station})

            // const foundTrain = await trainModel.aggregate([
            //     {
            //         // $project: { train_number: 1,"station.station_name":1},
            //         $project: { train_number: 1}
            //     },{
            //         // $match: {["station.station_name": origin],["station.station_name": destination]}
            //         $match:{station: origin}
            //     }
            // ])
            const foundTrain = await trainModel.find({$and:[{"station.station_name": origin},{"station.station_name": destination}]})
            console.log("--------------------------------------------------------------------------------------------------")
            // console.log(foundTrain)
            for(let i of foundTrain){
                console.log(i.train_number)
            }
            res.status(200).json(foundTrain)
            
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
