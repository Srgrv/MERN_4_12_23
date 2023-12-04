import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

//contants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@pizza.p4vvat0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority` // если выходит ошибка о whitelist, то необходимо поменять во вкладке Network Access IP адресс на 0.0.0.0/0
    );

    app.listen(PORT, () => {
      console.log(
        `Hello motherfucker, server was started on the PORT: ${PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

start();
