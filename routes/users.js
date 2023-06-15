const usersRouter = require("express").Router();

const {
  getUsers,
  getUsersId,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUsersId);
usersRouter.post("/", createUser);

usersRouter.patch("/me/avatar", updateAvatar); // обновляет аватар
usersRouter.patch("/me", updateProfile); // обновляет профиль

module.exports = usersRouter;
