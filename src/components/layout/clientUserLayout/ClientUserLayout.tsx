"use client";

import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useUser } from "@/store/useUser";
import { getIsAuth } from "@/utils/getIsAuth";
import { userApi } from "@/lib/api/userApi";

export default function ClientUserLoader() {
    const setUser = useUser(state => state.actions.setUser)

    const {data} = useQuery({
        queryKey: ['User'],
        queryFn: userApi.getMe,
    });

    useEffect(() => {
        if (data) {
            setUser(data)
        }
    }, [data, setUser]);

    return null; 
}
