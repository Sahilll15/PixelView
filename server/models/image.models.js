const { default: mongoose } = require("mongoose");


const ImageModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Image=mongoose.model('Image',ImageModel);
module.exports={
    Image
};