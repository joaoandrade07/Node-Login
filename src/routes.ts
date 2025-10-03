import {Router} from 'express';
import { login } from './controllers/loginController';


export const router = Router();

router.post("/login", login);