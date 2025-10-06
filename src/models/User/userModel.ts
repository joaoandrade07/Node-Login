import { Role } from "../../generated/prisma";

export interface userModel {
    name: string;
    email:string;
    password:string;
    role: Role
}