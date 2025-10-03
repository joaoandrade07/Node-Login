import {Request, Response} from 'express'
import { LoginModel } from '../models/Login/loginModel'
import { loginService } from '../services/loginService';


export const login = async (req:Request, res:Response) => {
    const login:LoginModel = req.body;
    const data = await loginService(login);
    return res.status(data.statusCode).json(data.body);
}