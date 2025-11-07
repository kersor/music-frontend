import { ILogin, IRegister } from "@/types/auth.type";
import { api } from "../axios";

export const authApi = {
    login: async (login: ILogin) => {
        const {data} = await api.post('/auth/login', login)
        return data
    },

    register: async (register: IRegister) => {
        const {data} = await api.post( '/auth/register', register)
        return data
    }
}