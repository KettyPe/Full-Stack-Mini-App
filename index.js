import express from "express";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";
import { loginValidation } from "./validations/login.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/UserControlles.js"

mongoose
     .connect('mongodb+srv://admin:123@cluster0.rmgd20b.mongodb.net/blog?appName=Cluster0')
     .then(() => console.log('DataBase OK'))
     .catch((err) => console.log('DataBase Error', err))

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, register)
app.post('/auth/login', loginValidation, login)
app.get('/auth/me', checkAuth, getMe)

app.listen(444, (err) => {
     if (err) {
          return console.log("Server Error")
     }

     console.log("Server OK")
});