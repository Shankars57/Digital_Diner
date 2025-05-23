const express = require("express");
const userRoutes = express.Router();
const { createUser, userLogin } = require("../controller/UserController");

userRoutes.post("/register", createUser);
userRoutes.post("/login", userLogin);

module.exports = userRoutes;
