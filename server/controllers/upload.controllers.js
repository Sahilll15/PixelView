const { Image } = require("../models/image.models");
const { User } = require("../models/user.models");


const AddImage=async(req,res)=>{
    const {name}=req.body;

    try {
        if(!name ){
            return res.status(400).json({msg:"Please fill all the fields"})
        }    

        const file=req.file;

        const image=await Image.create({
            name,
            imageUrl:file.path,
            user:req.user.id
        })

        if(!image){
            return res.status(400).json({msg:"Image not added"})
        }

        res.status(200).json({
            message: 'Image added successfully',
            image,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Internal server error"})

    } 
}

const GetImages=async(req,res)=>{
    try {
        const images=await Image.find({user:req.user.id});
        res.status(200).json({
            images
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Internal server error"})
    }
}

const deleteImage=async(req,res)=>{
    const {id}=req.params;
    const userid=req.user.id;
    try {
        const image =await Image.findById(id);
        if(!image){
            return res.status(404).json({msg:"Image not found"})
        }   

        const ExistingUser=await User.findById(userid);

        if(!ExistingUser){
            return res.status(404).json({msg:"User not found"})
        }


        if(image.user.toString()!==userid){
            return res.status(401).json({msg:"User not authorized"})
        }

        await Image.findByIdAndDelete(id);

        res.status(200).json({msg:"Image deleted successfully"}
        )

    }
    catch(error){
        console.log(error)
        res.status(500).json({msg:"Internal server error"})
    
    }
}





module.exports={
    AddImage,
    GetImages,
    deleteImage
};