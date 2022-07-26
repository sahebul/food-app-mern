const express=require('express');
const { signup,login,addAddress,getAddress,editAddress } = require('../controllers/userController');
const { auth } = require('../middleWare/authHandler');
const router=express.Router();

router.post('/',signup);
router.post('/login',login)
router.route('/address').get(auth,getAddress)
router.route('/add-address').post(auth,addAddress)
router.route('/edit-address').put(auth,editAddress)

module.exports=router;