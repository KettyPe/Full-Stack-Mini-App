import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";
import UserModel from "./models/User.js";

mongoose
     .connect('mongodb+srv://admin:123@cluster0.rmgd20b.mongodb.net/blog?appName=Cluster0')
     .then(() => console.log('DataBase OK'))
     .catch((err) => console.log('DataBase Error', err))

const app = express();

app.use(express.json());

app.post('/auth/login', async (req, res) => {
     try {
          const user = await UserModel.findOne({ email: req.body.email })

          if (!user) {
               return res.status(404).json({
                    //это сделано для себя
                    message: 'User not found'
               })
          }

          const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

          if (!isValidPass) {
               return res.status(404).json({
                    message: 'Not correct login and password'
               })
          }

          const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' })

          const { passwordHash, ...UserData } = user._doc

          res.json({
               ...UserData,
               token
          })

     } catch (err) {
          console.log(err);

          res.status(500).json({
               message: 'Ошибка авторизации'
          })
     }
})


app.post('/auth/register', registerValidation, async (req, res) => {
     try {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
               return res.status(400).json(errors.array())
          }

          //генерируем шифрование пароля
          const password = req.body.password;
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt)

          const docUser = new UserModel({
               email: req.body.email,
               fullName: req.body.fullName,
               avatarUrl: req.body.avatarUrl,
               passwordHash: hash,
          })

          const user = await docUser.save()

          const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' })

          const { passwordHash, ...UserData } = user._doc

          res.json({
               ...UserData,
               token
          })

     } catch (err) {
          console.log(err);

          res.status(500).json({
               message: 'Ошибка регистрации'
          })
     }
})

app.listen(444, (err) => {
     if (err) {
          return console.log("Server Error")
     }

     console.log("Server OK")
});