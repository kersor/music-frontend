import { User } from "@/types/auth.type";
import { api } from "../axios";
import { getIsAuth } from "@/utils/getIsAuth";

export const userApi = {
    updateUser: async ({ id, data }: {id: string, data: User}) => {
        const { data: response } = await api.patch(`/user/${id}`, data);
        return response;
    },
    
    getMe: async () => {
        const isAuth = getIsAuth()
        if (!isAuth) return null

        const { data } = await api.get("/auth/me");
        return data;
    }
}