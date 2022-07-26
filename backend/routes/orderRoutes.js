const express=require('express');
const { placeOrder,myOrders } = require('../controllers/orderController');
const {auth} = require('../middleWare/authHandler');
const router=express.Router();

router.route('/myorders').get(auth,myOrders);
router.route('/placeorder').post(auth,placeOrder)

module.exports=router