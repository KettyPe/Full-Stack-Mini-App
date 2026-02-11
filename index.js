import express from "express";
import mongoose from "mongoose";
import multer from "multer"

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

const storage = multer.diskStorage({
     destination: (_, __, cb) => {
          cb(null, 'uploads');
     },
     filename: (_, file, cb) => {
          cb(null, file.originalname)
     }
})

const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.post('/auth/register', registerValidation, UserControllers.register)
app.post('/auth/login', loginValidation, UserControllers.login)
app.get('/auth/getmeinfo', checkAuth, UserControllers.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
     res.json({
          url: `/uploads/${req.file.originalname}`
     })
})

app.post('/posts', checkAuth, postCreateValidation, PostControllers.create)
app.get('/posts', PostControllers.getAll)
app.get('/posts/:id', PostControllers.getOne)
app.delete('/posts/:id', checkAuth, PostControllers.removePost)
app.patch('/posts/:id', postCreateValidation, PostControllers.updatePost)

app.listen(444, (err) => {
     if (err) {
          return console.log("Server Error")
     }

     console.log("Server OK")
});