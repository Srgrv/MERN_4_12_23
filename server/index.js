import express from "express";
import mongoose from "mongoose";

const app = express();

// app.listen(5000, () => {
//   console.log("Server is starting");
// });

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://sgrgv:sgrgv@pizza.p4vvat0.mongodb.net/Pizza?retryWrites=true&w=majority` // если выходит ошибка о whitelist, то необходимо поменять во вкладке Network Access IP адресс на 0.0.0.0/0
    );

    app.listen(3002, () => {
      console.log(
        `Hello motherfucker, server was started on the PORT: ${3002}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

start();
