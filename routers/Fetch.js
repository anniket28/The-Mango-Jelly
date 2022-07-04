// Require
const express=require('express')
const Mobile=require('../models/Mobiles')

// Router
const router=express.Router()

// Fetch all mobiles
router.get('/get-allmobiles',async(req,res)=>{
    try {
        let mobiles=await Mobile.find()

        res.send({allMobiles:mobiles})
    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// Fetch by mobile name
router.get('/get-mobileByName',async(req,res)=>{
    try {
        let mobile=await Mobile.findOne({name:req.body.name})

        if(mobile){
            res.send({mobileByName:mobile})
        }
        else{
            res.send({exists:false,"No Mobile":"No mobile exists with this name"})
        }
    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// Fetch by mobile brand
router.get('/get-mobileByBrandName',async(req,res)=>{
    try {
        let mobiles=await Mobile.find({brandName:req.body.brandName})

        if(mobiles.length>0){
            res.send({mobileByBrandName:mobiles})
        }
        else{
            res.send({exists:false,"No Mobile":"No mobile exists with this brand name"})
        }
    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// Fetch by keyword in description
router.get('/get-mobileByKeywordInDescription',async(req,res)=>{
    try {
        let allMobiles=await Mobile.find()

        // Finding by keyword
        let mobiles=[]
        for (let index = 0; index < allMobiles.length; index++) {
            if(allMobiles[index].description.includes(req.body.keyword)){
                mobiles.push(allMobiles[index])
            }
        }

        // Sending response
        if(mobiles.length>0){
            res.send({mobileByKeywordInDescription:mobiles})
        }
        else{
            res.send({exists:false,"No Mobile":"No mobile exists with this keyword in description."})
        }
    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// Fetch by sort
router.get('/sort/:sortBy/:order',async(req,res)=>{
    try {
        function compareAsc(a, b) {
            if(req.params.sortBy=='ram'){return a.ram - b.ram}
            else if(req.params.sortBy=='internalStorage'){return a.internalStorage - b.internalStorage}
            else if(req.params.sortBy=='screenSize'){return a.screenSize - b.screenSize}
        }
        function compareDesc(a, b) {
            if(req.params.sortBy=='ram'){return b.ram - a.ram}
            else if(req.params.sortBy=='internalStorage'){return b.internalStorage - a.internalStorage}
            else if(req.params.sortBy=='screenSize'){return b.screenSize - a.screenSize}
        }

        let mobiles=await Mobile.find()

        if(req.params.order=="asc"){
            mobiles.sort(compareAsc)
        }
        else if(req.params.order=="desc"){
            mobiles.sort(compareDesc)
        }

        res.send(mobiles)

    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// Fetch by filter GT
router.get('/filterGT/:filterBy/:value',async(req,res)=>{
    try {
        let filterBy=req.params.filterBy
        let filterByVal=req.params.value
        let allMobiles=await Mobile.find()

        // After filter
        let mobiles=[]
        for (let index = 0; index < allMobiles.length; index++) {
            // RAM
            if(filterBy=='ram'){
                if(allMobiles[index].ram>=filterByVal){
                    mobiles.push(allMobiles[index])
                }
            }
            // Internal Storage
            else if(filterBy=='internalStorage'){
                if(allMobiles[index].internalStorage>=filterByVal){
                    mobiles.push(allMobiles[index])
                }
            }
            // Screen Size
            else if(filterBy=='screenSize'){
                if(allMobiles[index].screenSize>=filterByVal){
                    mobiles.push(allMobiles[index])
                }
            }
        }

        if(mobiles.length>0){
            res.send(mobiles)
        }
        else{
            res.send("No Mobiles found with this filter")
        }

    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// Fetch by filter LT
router.get('/filterLT/:filterBy/:value',async(req,res)=>{
    try {
        let filterBy=req.params.filterBy
        let filterByVal=req.params.value
        let allMobiles=await Mobile.find()

        // After filter
        let mobiles=[]
        for (let index = 0; index < allMobiles.length; index++) {
            // RAM
            if(filterBy=='ram'){
                if(allMobiles[index].ram<=filterByVal){
                    mobiles.push(allMobiles[index])
                }
            }
            // Internal Storage
            else if(filterBy=='internalStorage'){
                if(allMobiles[index].internalStorage<=filterByVal){
                    mobiles.push(allMobiles[index])
                }
            }
            // Screen Size
            else if(filterBy=='screenSize'){
                if(allMobiles[index].screenSize<=filterByVal){
                    mobiles.push(allMobiles[index])
                }
            }
        }

        if(mobiles.length>0){
            res.send(mobiles)
        }
        else{
            res.send("No Mobiles found with this filter")
        }

    } catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})


module.exports=router