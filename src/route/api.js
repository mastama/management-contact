import express from "express";
import userController from "../controller/UserController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

//User API
userRouter.get("/api/users/current", userController.get);

export {
    userRouter
}
