const trainModel = require('../model/train.js')
const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('csv-parser')

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
        //input => origin, destination, time, date, passenger,dateReturn, timeReturn
        try{
            const { origin, destination, date, time, passenger, dateReturn, timeReturn } = req.body

            const foundTrain = await trainModel.find({$and:[{"station.station_name": origin},{"station.station_name": destination}]})
            console.log("--------------------------------------------------------------------------------------------------")

            for(let i of foundTrain){
                console.log(i.train_number)
                let results = []
                if(i.class_in_train.class_3.class_available){
                    // const jsonTemp = require('../price_test.json')
                    let rawdata = fs.readFileSync('price_test.json');
                    let jsonTemp = JSON.parse(rawdata);
                    console.log(jsonTemp)
                    for(let j in jsonTemp){       
                        if(j == origin || j == destination){
                            for(let k in jsonTemp[j]){
                                if(k == origin || k == destination){
                                    // console.log("-->" + jsonTemp[j][k])
                                }
                            }
                        }
                    }
                }
            }
            //Check class of train foundTrain[i].
            const filterTrainData = []
            for(let i in foundTrain){
                const { deTime, arTime,duration} = await Train.findDepartureArrivalTime(foundTrain[i].station,origin,destination)

                filterTrainData.push({
                    // "trainNumber":,
                    "origin": origin, 
                    "destination": destination, 
                    "departureTime": deTime, 
                    "arrivalTime": arTime, 
                    "duration": duration,
                    "date": date, 
                    // "number_of_passenger":, 
                    
                })
            }

            res.status(200).json(filterTrainData)
            
        }catch(err){
            console.log(err)
            res.send("error")
        }

    }

    static findDepartureArrivalTime(station,origin,destination) {
        
        let temp = station.find( ({station_name}) => station_name === origin)
        const deTimeH = temp.departure_hour
        const deTimeM = temp.departure_minute
        temp = station.find( ({station_name}) => station_name === destination)
        const arTimeH = temp.departure_hour
        const arTimeM = temp.departure_minute

        const deTime = deTimeH + ":" + deTimeM
        const arTime = arTimeH + ":" + arTimeM

        const duration = this.calculateTravelDuration(Number(deTimeH),Number(deTimeM),Number(arTimeH),Number(arTimeM))

        return { deTime, arTime,duration}
    }

    static calculateTravelDuration(deTimeH,deTimeM,arTimeH,arTimeM){
        let deltaH = 0
        let deltaM = 0
        if(arTimeM-deTimeM > 0){
            deltaH = arTimeH - deTimeH
            deltaM = arTimeM - deTimeM
        }else{
            arTimeH -= 1
            arTimeM += 60
            deltaH = arTimeH - deTimeH
            deltaM = arTimeM - deTimeM
        }
        return String(deltaH) + ":" + String(deltaM)
    }

    static async test(req,res){
        try{
            this.calculatePrice(req.body.origin,req.body.destination)
            res.send("Good")
        }catch(err){
            console.log(err)
            res.send("error someting")
        }

    }

    static calculatePrice(oring , destination){
        let results = []
        fs.createReadStream('./price_class_3.csv')
        .pipe(csv({
            headers: false
        }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results);
        });
            }

}

module.exports = Train
