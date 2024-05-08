const { User } = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')


const register=async(req,res)=>{
    const {email,password}=req.body;

    
    try {
        if(!email || !password ){
            return res.status(400).json({msg:"Please fill all the fields"})
        }    

        const lowercaseEmail=email.toLowerCase();
        const hashedPassword=await bcrypt.hash(password,10);
      

        const userExists=await User.findOne({
            email:lowercaseEmail
        })

        if(userExists){
            return res.status(400).json({msg:"User already exists"})
        }

        const user=await User.create({
            email:lowercaseEmail,
            password:hashedPassword
            
        })

        if(!user){
            return res.status(400).json({msg:"User already exists"})
        }

        res.status(200).json({
            message: 'Registration successful.',
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Internal server error"})

    } 
}


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
       
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

     
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const getLoggedinUSer = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({
            id: user._id,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}


module.exports = {
    register,
    login,
    getLoggedinUSer
}