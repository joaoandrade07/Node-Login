import {Request, Response} from 'express'
import { loginModel } from '../models/Login/loginModel'
import { loginService } from '../services/loginService';


export const login = async (req:Request, res:Response) => {
    const login:loginModel = req.body;
    const data = await loginService(login);
    return res.status(data.statusCode).json(data.body);
}