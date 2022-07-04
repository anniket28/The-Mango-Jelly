const mongoose=require('mongoose')

const MobileSchema=new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    brandName:{
        type:String
    },
    ram:{
        type:Number
    },
    internalStorage:{
        type:Number
    },
    screenSize:{
        type:Number
    }
})

module.exports=mongoose.model('mobiles',MobileSchema)