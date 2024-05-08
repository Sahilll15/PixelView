const express=require('express')
const router=express.Router()

const {register,login,getLoggedinUSer}=require('../controllers/user.controllers')
const { validateToken } = require('../middleware/verifyJWT.models')

router.post('/register',register)
router.post('/login',login)
router.get('/user',validateToken,getLoggedinUSer)

module.exports=router