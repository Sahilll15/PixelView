const {AddImage,GetImages,deleteImage}=require('../controllers/upload.controllers')
const express=require('express')
const router=express.Router()

const {upload}=require('../middleware/upload')
const { validateToken } = require('../middleware/verifyJWT.models')


router.post('/addimage',upload.single('image'),validateToken,AddImage)
router.get('/getimages',validateToken,GetImages)
router.delete('/deleteimage/:id',validateToken,deleteImage)

module.exports=router