import express from "express";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";
import { loginValidation } from "./validations/login.js";
import { postCreateValidation } from "./validations/post-create.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserControllers from "./controllers/UserControllers.js"
import * as PostControllers from "./controllers/PostControllers.js"

mongoose
     .connect('mongodb+srv://admin:123@cluster0.rmgd20b.mongodb.net/blog?appName=Cluster0')
     .then(() => console.log('DataBase OK'))
     .catch((err) => console.log('DataBase Error', err))

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, UserControllers.register)
app.post('/auth/login', loginValidation, UserControllers.login)
app.get('/auth/getmeinfo', checkAuth, UserControllers.getMe)

// app.get('/posts', PostControllers.getAll)
// app.get('/posts/:id', PostControllers.getOne)
// app.delete('/posts/:id', PostControllers.remove)
// app.patch('/posts/:id', PostControllers.update)
app.post('/posts', checkAuth, postCreateValidation, PostControllers.create)

app.listen(444, (err) => {
     if (err) {
          return console.log("Server Error")
     }

     console.log("Server OK")
});