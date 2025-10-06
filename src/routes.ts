import {Router} from 'express';
import { login } from './controllers/loginController';
import { createUserController, getUserByIdController, getUsersController } from './controllers/userController';


export const router = Router();

router.post("/login", login);

router.get("/getUsers", getUsersController);
router.get("/getUsers/:id", getUserByIdController);
router.post("/createUser", createUserController);