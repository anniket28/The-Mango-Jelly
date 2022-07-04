// Require
const {urlencoded}=require('express')
const connection=require('./database')
const express=require('express')
const cors=require('cors')

// App
const app=express()
const port=process.env.PORT || 4000

// Use
app.use(express.json())
app.use(cors())
app.use(urlencoded({extended: false}))

// Crud
app.use('/api/crud',require('./routers/Crud'))
// Fetch
app.use('/api/fetch',require('./routers/Fetch'))

// App Run
app.listen(port,()=>{
    console.log("App Running at "+ port)
})