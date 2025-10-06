import { Request,Response } from "express";
import { createUserService, getUserByIdService, getUsersService } from "../services/userService"
import { userModel } from "../models/User/userModel";

export const getUsersController = async (req: Request, res: Response) => {
    const data = await getUsersService();
    return res.status(data.statusCode).json(data.body);
}

export const getUserByIdController = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const data = await getUserByIdService(id);
    return res.status(data.statusCode).json(data.body);
}

export const createUserController = async (req: Request, res: Response) => {
    const user: userModel = req.body;
    const data = await createUserService(user);
    return res.status(data.statusCode).json(data.body);
}