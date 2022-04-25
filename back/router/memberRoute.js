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

router.route('/register').post(userDAO.register)
router.route('/login').post(userDAO.login)

router.route('/booking').post(trainDAO.customerFindTrain)
router.route('/makeSeatLayout').post(ticketDAO.makeSeatLayout)
router.route('/addTicket').post(ticketDAO.addTicket)

//Staff
router.route('/staff/login').post(staffDAO.login)
router.route('/staff/register').post(staffDAO.register)
router.route('/staff/showTicket/:id').get(staffDAO.showTicket)
router.route('/staff/search').post(staffDAO.showReservTicket)

// Test
router.route('/user/showUserProfile').post(userDAO.showUserProfile)
router.route('/test').get(trainDAO.test)

// export default router
module.exports = router
