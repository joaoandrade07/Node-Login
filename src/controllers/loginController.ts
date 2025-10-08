import {Request, Response} from 'express'
import { ILoginModel } from '../interfaces/Login'
import { loginService } from '../services/loginService';


export const login = async (req:Request, res:Response) => {
    const login:ILoginModel = req.body;
    const data = await loginService(login);
    return res.status(data.statusCode).json(data.body);
}