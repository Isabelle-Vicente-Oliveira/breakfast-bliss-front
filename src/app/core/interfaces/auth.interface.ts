import { User } from "./user.interface"

export interface CreateDtoSession {
    email: string,
    password: string
}

export interface Session {
    token: string,
    user: User
}