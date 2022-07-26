const express=require('express');
const {adminLogin,createAdminUser}=require('../../controllers/admin/adminController')
const router=express.Router();

router.route('/login').post(adminLogin)
router.route('/createnew').post(createAdminUser)

module.exports=router;