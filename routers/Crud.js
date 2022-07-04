// Require
const express=require('express')
const Mobile=require('../models/Mobiles')

// Router
const router=express.Router()

// Add Mobile
router.post('/add-mobile',async(req,res)=>{
    try {
        let mobile=await Mobile.findOne({name:req.body.name})
        
        // Checking if mobile exists
        if(mobile){
            res.json({exists:true,"Mobile Already Exists":"Mobile with this name already exists."})
        }
        else{
            // Creating and adding new mobile data to database
            mobile=new Mobile({
                name:req.body.name,
                description:req.body.description,
                brandName:req.body.brandName,
                ram:req.body.ram,
                internalStorage:req.body.internalStorage,
                screenSize:req.body.screenSize,
            })
            mobile.save()

        res.json({added:true,mobileAdded:mobile})
        }
    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// Edit Mobile
router.post('/edit-mobile',async(req,res)=>{
    try {
        let mobile=await Mobile.findOne({name:req.body.name})

        // Checking if mobile exists
        if(mobile){
            // Creating new data
            const newData={}

            // If value to be changed replace with new value
            if(req.body.name){newData.name=req.body.name}
            if(req.body.description){newData.description=req.body.description}
            if(req.body.brandName){newData.brandName=req.body.brandName}
            if(req.body.ram){newData.ram=req.body.ram}
            if(req.body.internalStorage){newData.internalStorage=req.body.internalStorage}
            if(req.body.screenSize){newData.screenSize=req.body.screenSize}

            // Updating Data
            const editMobile=await Mobile.findByIdAndUpdate(mobile._id,{$set:newData},{new:true})

            res.json({updated:true,mobileUpdated:editMobile})

        }
        else{
            res.json({exists:false,"Mobile Does Not Exists":"Mobile with this name does not exists."})
        }
    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// Delete Mobile
router.post('/delete-mobile',async(req,res)=>{
    try {
        let mobile=await Mobile.findOne({name:req.body.name})

        // Checking if mobile exists
        if(mobile){
            // Deleting Mobile
            const deleteMobile=await Mobile.findByIdAndDelete(mobile._id)

            res.json({deleted:true})
        }
        else{
            res.json({exists:false,"Mobile Does Not Exists":"Mobile with this name does not exists."})
        }
    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

module.exports=router