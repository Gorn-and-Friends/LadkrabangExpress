const express = require('express')
const calculatePrice = require('../DAO/calculatePrice.js')
const foodDAO = require('../DAO/foodDAO.js')
const trainDAO = require('../DAO/trainDAO.js')
const userDAO = require('../DAO/userDAO')
const ticketDAO = require('../DAO/ticketDAO.js')
const staffDAO = require('../DAO/staffDAO.js')

const router = express.Router()

router.route('/checkout').post(calculatePrice)
router.route('/addFood').post(foodDAO.add)
router.route('/getAllFood').get(foodDAO.showAllFood)
router.route('/updateFoodPrice').post(foodDAO.updatePrice)
router.route('/addTrain').post(trainDAO.add)
router.route('/findTrain').post(trainDAO.customerFindTrain)
router.route('/register').post(userDAO.register)
router.route('/login').post(userDAO.login)
router.route('/test').get(trainDAO.test)
router.route('/addTicket').post(ticketDAO.addTicket)
router.route('/staff/showTicket/:id').get(staffDAO.showTicket)
router.route('/makeSeatLayout/:trainID/:date').get(ticketDAO.makeSeatLayout)

// export default router
module.exports = router
