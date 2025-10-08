import { Request,Response } from "express";
import { createUserService, deleteUserService, getUserByIdService, getUsersService } from "../services/userService"
import { IUserModel } from "../interfaces/User";

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
    const user: IUserModel = req.body;
    const data = await createUserService(user);
    return res.status(data.statusCode).json(data.body);
}

export const deleteUserController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await deleteUserService(id);
    return res.status(data.statusCode).json(data.body);
}