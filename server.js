const express = require('express');
const path= require('path');
const fs = require('fs')
const PORT= process.env.PORT||3001
const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(express.static("public"))
app.get('/',(rec,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"))
})

app.get('/notes',(rec,res)=>{
    res.sendFile(path.join(__dirname,"/public/notes.html"))
})
app.get("/api/notes",(rec,res)=>{
    fs.readFile("./db/db.json","utf8",(err,data)=>{
        if (err){
            console.error(err)
            res.status(500).send('This is broken')
return
        }
        try{
            const notes=JSON.parse(data)
            res.json(notes)
        }catch(parseError){
            console.error(parseError)
            res.status(500).send('error parsing data')
        }
    })
})
app.listen(PORT,()=>{
    console.log(`app listening @: ${PORT}`)
}) 