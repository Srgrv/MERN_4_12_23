import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(402).json({
        message: "Данный username уже занят",
      });
    }

    const salt = bcrypt.genSaltSync(10); // сложность хэширования пароля
    const hash = bcrypt.hashSync(password, salt); // захэшировали пароль

    const newUser = new User({
      username,
      password: hash,
    });

    await newUser.save();

    res.json({
      newUser,
      message: "Регистрация прошла успешно",
    });
  } catch (error) {
    res.json({
      message: "Ошибка при создании пользователя",
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "Такого пользователя не существует",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Неверный пароль",
      });
    }

    //на инсомнии не проходить login

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
      message: "Вы вошли в систему",
    });
  } catch (error) {
    res.json({
      message: "Ошибка при авторизации",
    });
  }
};

//me - этот router необходим для того, чтобы всегда при обновлении страницы нам не нужно было логиться
export const me = async (req, res) => {
  try {
    // ищем пользователя по id
    const user = await User.findById(req.userId);

    //проверка на наличии такого пользователся в базе данных
    if (!user) {
      return res.json({
        message: "Такого пользователя не существует",
      });
    }

    //создаем токен
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //отправляем пользователя и токен
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({
      message: "Нет доступа",
    });
  }
};
