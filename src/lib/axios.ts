import { deleteCookie, getCookie, setCookie } from "@/utils/cookie/client-cookie";
import axios, { AxiosError } from "axios";

type LastEndpointErrorCode = 
    "me" | 
    "refresh"

export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = getCookie('access_token')

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    async function onFulfilled(response) {
    return response;
}, async function onRejected(error: AxiosError) {
    const status = error.status
    const config = error.config


    if (status === 401) {
        const arrEndpoints = config?.url?.split('/') || []
        const lastEndpoint = arrEndpoints[arrEndpoints.length - 1] as LastEndpointErrorCode

        if (lastEndpoint === "me") {
            const res = await api.post('/auth/refresh')

            if (res.data.access_token) {
                const access_token = res.data.access_token
                setCookie('access_token', access_token)
            }
        } else if (lastEndpoint === "refresh") {
            window.location.href = "/logout";
        }
    }

    return Promise.reject(error);
});