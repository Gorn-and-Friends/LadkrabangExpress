const express = require('express')
const calculatePrice = require('../DAO/calculatePrice.js')
const foodDAO = require('../DAO/foodDAO.js')
const trainDAO = require('../DAO/trainDAO.js')

const router = express.Router()

router.route('/checkout').post(calculatePrice)
router.route('/addFood').post(foodDAO.add)
router.route('/getAllFood').get(foodDAO.showAllFood)
router.route('/updateFoodPrice').post(foodDAO.updatePrice)
router.route('/addTrain').post(trainDAO.add)
router.route('/findTrain').post(trainDAO.customerFindTrain)
router.route('/register').post(trainDAO.test)

// export default router
module.exports = router
