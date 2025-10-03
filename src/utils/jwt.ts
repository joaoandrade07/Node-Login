import jwt from 'jsonwebtoken'

export interface JwtPayload {
    id: number;
    email: string;
    role: string;
}

export const generateToken = (user: JwtPayload) => {
    return jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}
    );
}


`
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "mysql"
    url = env("DATABASE_URL")
}

model User {
    id  String  @id @default(uuid())
    email   String  @unique @db.VarChar(255)
    password    String  @db.VarChar(255)
    role    String  @default("user")
    createdAt   DateTime    @default(now())
    updatedAt   DateTime    @updatedAt
}


PORT=3000

JWT_SECRET="chave_secreta_codificacao_token"

DATABASE_URL="mysql://joaoandrade:12345678@localhost:3306/teste"
`