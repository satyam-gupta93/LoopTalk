import { Router } from "express";
import { login, register } from "../controllers/userController.js";

const UserRouter = Router();

// Auth Routes
UserRouter.post("/login", login);
UserRouter.post("/register", register);

// Activity Routes (add later)
UserRouter.post("/add-to-activity", (req, res) => {
  res.status(200).json({ message: "Add to activity endpoint (to be implemented)" });
});

UserRouter.get("/get-all-activity", (req, res) => {
  res.status(200).json({ message: "Get all activity endpoint (to be implemented)" });
});

export default UserRouter;