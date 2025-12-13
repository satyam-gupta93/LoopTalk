import { Router } from "express";import {
  login,
  register,
  addToHistory,
  getUserHistory
} from "../controllers/userController.js";
const UserRouter = Router();

// Auth Routes
UserRouter.post("/login", login);
UserRouter.post("/register", register);

// Activity Routes 

UserRouter.post("/add-to-activity", addToHistory);
UserRouter.get("/get-all-activity", getUserHistory);
export default UserRouter;