import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
     .connect('mongodb+srv://admin:123@cluster0.rmgd20b.mongodb.net/?appName=Cluster0')
     .then(() => console.log('DataBase OK'))
     .catch((err) => console.log('DataBase Error', err))

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
     res.send("Hello my app")
})

app.post('/auth/login', (req, res) => {
     console.log(req.body)

     const token = jwt.sign({
          email: req.body.email,
          fullName: 'Yuliya Sergeevna'
     },
          'secret123'
     )

     res.json({
          success: true,
          token
     })
})

app.listen(444, (err) => {
     if (err) {
          return console.log("Server Error")
     }

     console.log("Server OK")
})