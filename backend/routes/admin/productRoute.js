const express=require('express');
const { list,add,edit,del,productByCategory } = require('../../controllers/admin/productController');
const { adminAuth } = require('../../middleWare/authHandler');
const { doUpload } = require('../../middleWare/uploadHandler');
const router=express.Router();

router.route('/').get(list);
router.route('/add').post(adminAuth,doUpload,add);
router.route('/edit').put(adminAuth,edit);
router.route('/delete/:id').delete(adminAuth,del);
router.route('/category/:id').get(productByCategory)
module.exports=router;