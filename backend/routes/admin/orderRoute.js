const express=require('express');
const { list,updatestatus } = require('../../controllers/admin/adminOrderController');
const { adminAuth } = require('../../middleWare/authHandler');
const router=express.Router();


router.route('/').get(adminAuth,list)
router.route('/updatestatus').put(adminAuth,updatestatus)

module.exports=router