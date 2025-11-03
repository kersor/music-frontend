import { User } from "@/types/auth.type";
import { create } from "zustand";



interface IUser {
    user: User | null,

    actions: {
        setUser: (payload: User) => void
        logout: () => void
    }
}


export const useUser = create<IUser>((set, get) => ({
    user: null,

    actions: {
        setUser: (payload: User) => {
            set({ user: payload })
        },
        logout: () => {
            set({ user: null })
        }
    }
}))