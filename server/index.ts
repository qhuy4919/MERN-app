import { normalize } from "path";
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authRouter = require('./router/auth');

const app = express();
const port = normalize(process.env.PORT || "1234");

const database = async () => {
   try {
       const resposne = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-app.xs0mm.mongodb.net/MERN-app?retryWrites=true&w=majority`, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
       });
       console.log('connected!!!');
   } catch (error) {
       console.log(error);
       process.exit(1);
   }
}

database();

app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(port);