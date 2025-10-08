import prisma from "../prisma";
import bcrypt from "bcrypt"
import { badRequest, created, internalServerError, noContent, ok } from "../utils/http-helpers";
import {IUserModel} from "../interfaces/User"
import { Role } from "../generated/prisma";

export const getUsersService = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true
        }
    });
    return ok(users);
}

export const getUserByIdService = async(id:string) => {
    const user = await prisma.user.findUnique({
        where: {id: id},
        omit:{password:true}
    });
    if(!user) return noContent();
    return ok(user);
}

export const createUserService = async(user: IUserModel) => {
    try {
        const userExists = await prisma.user.findUnique({where:{ email: user.email }});
        if(userExists || userExists != undefined) return badRequest("Erro ao realizar cadastro. Tente novamente.");
        const passwordHash = await bcrypt.hash(user.password, 10);
        const data = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: passwordHash,
                role: user.role,
            },
            omit: {
                password: true
            }
        });
        return created(data);
    } catch (error) {
        return badRequest("Erro ao realizar cadastro. Tente .");
    }
}

export const updateUserNameService = async(userName: string, userId:string) => {
    try {
        const data = await prisma.user.update({
            where:{id: userId},
            data:{
                name: userName,
            },
            omit:{
                password:true
            }
        });
        return ok(data);
    } catch (error) {
        return badRequest("Erro ao atualizar usuário.")
    }
}

export const updateUserEmailService = async(userEmail: string, userId:string) => {
    try {
        const data = await prisma.user.update({
            where:{id: userId},
            data:{
                email: userEmail,
            },
            omit:{
                password:true
            }
        });
        return ok(data);
    } catch (error) {
        return badRequest("Erro ao atualizar usuário.")
    }
}

export const updateUserRoleService = async(userRole: Role, userId:string) => {
    try {
        const data = await prisma.user.update({
            where:{id: userId},
            data:{
                role: userRole,
            },
            omit:{
                password:true
            }
        });
        return ok(data);
    } catch (error) {
        return badRequest("Erro ao atualizar usuário.")
    }
}

export const updateUserPasswordService = async(userPassword: string, userId:string) => {
    try {
        const passwordHash = await bcrypt.hash(userPassword,10);
        const data = await prisma.user.update({
            where:{id: userId},
            data:{
                password : passwordHash
            },
            omit:{
                password:true
            }
        });
        return ok(data);
    } catch (error) {
        return badRequest("Erro ao atualizar usuário.")
    }
}

export const deleteUserService = async(userId:string) => {
    const data = await prisma.user.delete({
        where: { id: userId }
    });
    return noContent();
}