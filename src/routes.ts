import {Router} from 'express';
import { login } from './controllers/loginController';
import { createUserController, deleteUserController, getUserByIdController, getUsersController } from './controllers/userController';
import { authenticateToken } from './middlewares/auth/authenticateToken';
import { authorizeRole } from './middlewares/auth/authorizeRole';
import { Role } from './generated/prisma';
import { authorizeRoleOrSelf } from './middlewares/auth/authorizeRoleOrSelf';
import { registerAdmin } from './middlewares/register/registerAdmin';

export const router = Router();

router.post("/login", login);

router.get("/getUsers", authenticateToken, authorizeRole([Role.ADMIN]), getUsersController);
router.get("/getUsers/:id", authenticateToken, authorizeRoleOrSelf([Role.ADMIN]), getUserByIdController);
router.post("/createUser", registerAdmin, createUserController);
router.delete("/deleteUser/:id", authenticateToken, authorizeRoleOrSelf([Role.ADMIN]), deleteUserController);