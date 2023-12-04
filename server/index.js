import express from "express"; // создание приложения
import mongoose from "mongoose"; // подключение к базе данных
import dotenv from "dotenv"; // шифрование в формате .env
import cors from "cors"; // необходим для того, чтобы бэкэнд разрешал запросы с разных API серверов

const app = express();
dotenv.config();

//contants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//middleware разширяет или дополняет базовые настройки express
app.use(cors());
app.use(express.json()); // нужно для того чтобы express понимал что все данные будут с фронтенда присылаться в формате json

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
