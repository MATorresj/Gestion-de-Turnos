import { Router } from "express";
import { getUsers, getUserById, createUser, loginUser, updateProfilePicture } from "../controllers/usersController";
import upload from "../middlewares/uploadMiddleware";

const userRouter: Router = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/:id/profile-picture", upload.single('profilePicture'), updateProfilePicture);

export default userRouter;