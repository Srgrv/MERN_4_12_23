import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  // достаем токен из req.header.authoriztion, который выглядить "Bearer ldfjaaldfhalkdshf", нужно с помощью регулярное выражения достать все кроме Bearer
  const token = (req.header.authorization || "").replace(/Bearer\s?/, "");
};
