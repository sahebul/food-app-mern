const express=require('express');
const { adminAuth } = require('../../middleWare/authHandler');
const {allCategories,addCategory,edit,deleteCat} = require('../../controllers/admin/categoryController');
const router=express.Router();


router.route('/').get(allCategories)
router.route('/add').post(adminAuth,addCategory)
router.route('/edit').put(adminAuth,edit)
router.route('/delete/:catId').delete(adminAuth,deleteCat)

module.exports=router