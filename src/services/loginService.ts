import { LoginModel } from "../models/Login/loginModel";
import { PrismaClient } from "@prisma/client"
import { notFound, ok } from "../utils/http-helpers";;
import { generateToken } from "../utils/jwt"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export const loginService = async (login: LoginModel) => {
    const user = await prisma.user.findUnique( { where :  {email: login.email} } );
    if(!user) return notFound("User or password are wrongs!");

    const isValid = await bcrypt.compare(login.password, user.password);
    if(!isValid) return notFound("User or password are wrongs!");

    const token = generateToken({id: user.id, email: user.email, role: user.role});
    
    return ok(token);
}