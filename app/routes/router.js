const express = require("express");
const route = express.Router();

const formcontroller = require("../controller/form");

// Api routes

route.post("/register", formcontroller.register);
route.post("/login", formcontroller.login);
route.get("/profile/:id", formcontroller.profile);

module.exports = route;
