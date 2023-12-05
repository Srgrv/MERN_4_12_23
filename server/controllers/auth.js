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

//me
export const me = async (req, res) => {
  try {
  } catch (error) {}
};
