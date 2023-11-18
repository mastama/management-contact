import express from "express";
import userController from "../controller/UserController.js";

const publicRouter = new express.Router();

publicRouter.post('/api/users', userController.register);

export {publicRouter}