import express from 'express'
import DataStore from 'nedb'
import mongoose  from 'mongoose'

const PORT = 3000
//db
const db= new DataStore({filename: 'user'})
db.loadDatabase()



const app=express()

app.use(express.json())

//API CRUD
//Create
app.post('/api/perso',(req,res)=>{
    console.log(req.body)
    db.insert(req.body)
    res.send(req.body)
})

app.get('/api/perso' ,(req,res)=>{
    db.find({},(err,docs)=>{
        if(err)
console.log(err)
res.send(docs)
    })
})

//get by id

app.get('/api/perso/:id' ,(req,res)=>{
    db.find({_id:req.params.id},(err,docs)=>{
        if(err)
console.log(err)
res.send(docs)
    })
})
//update
// app.patch('/api/perso/:id',(req,res)=>{
//     db.update( { _id: req.params.id }, req.body)
//     console.log(req.body)
//     res.send(req.body)
// })
app.patch('/api/perso/:id',(req,res)=>{
    db.update( { _id: req.params.id }, {$set:{...req.body}})
    console.log(req.body)
    res.send(req.body)
})


//delete
app.put('/api/perso/:id',(req,res)=>{
    db.remove( { _id: req.params.id }, )
    res.send(req.body)
})





mongoose.connect("mongodb://localhost:27017/booking?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
function(err){
    if (err){
        console.log(err)
        return 
    }
    app.listen(PORT,()=>{
        console.log(`le serveur est lancé sur le port :${PORT}`)
    })
})