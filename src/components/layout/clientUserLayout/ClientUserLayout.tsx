"use client";

import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useUser } from "@/store/useUser";
import { getIsAuth } from "@/utils/getIsAuth";

const getMe = async () => {
    const isAuth = getIsAuth()
    if (!isAuth) return null

    const { data } = await api.get("/auth/me");
    return data;
}



export default function ClientUserLoader() {
    const setUser = useUser(state => state.actions.setUser)

    const {data} = useQuery({
        queryKey: ['User'],
        queryFn: getMe,
    });

    useEffect(() => {
        if (data) {
            setUser(data)
        }
    }, [data, setUser]);

    return null; 
}
