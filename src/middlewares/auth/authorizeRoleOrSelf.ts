import { NextFunction, Request, Response } from "express"
import { Role } from "../../generated/prisma";

export const authorizeRoleOrSelf = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        if(!req.user) return res.status(401).json("Usuário não autenticado");
        if(!roles.includes(req.user.role) && id != req.user.id) return res.status(403).json("Usuário não autorizado");
        next();
    }
}