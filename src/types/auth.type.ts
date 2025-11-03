export interface IRegister {
    name: string
    password: string
    email: string
}

export interface ILogin {
    password: string
    email: string
}

export interface User {
    id: string
    name: string
    surname: string
    phone: string
    email: string
    avatar: string | null

}