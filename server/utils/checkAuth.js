import jwt from "jsonwebtoken";

//функция checkAuth нужна для того, чтобы с фронтенда при запросе на http://localhost:3002/api/auth/me нам не нужно было отправлять id пользователя, эта функция сама за нас сделает это расшифровав токен и изъяв из него id

export const checkAuth = (req, res, next) => {
  // достаем токен из req.header.authoriztion, который выглядить "Bearer ldfjaaldfhalkdshf", нужно с помощью регулярное выражения достать все кроме Bearer
  const token = (req.header.authorization || "").replace(/Bearer\s?/, "");
};

if (token) {
  try {
    //необходимо раскодировать зашифрованный токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //вшиваем в response дополнительное свойство userId
    res.userId = decoded.id;

    next();
  } catch (error) {
    return res.json({ message: "Нет доступа" });
  }
} else {
  return res.json({ message: "Нет доступа" });
}
