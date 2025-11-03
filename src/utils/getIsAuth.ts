import { getCookie as getCookieServer } from "./cookie/server-cookie"
import { getCookie as getCookieClient } from "./cookie/client-cookie"

export const getIsAuthAsync = async () => {
    const token = await getCookieServer('access_token')
    
    return token === undefined ? false : true
}

export const getIsAuth = () => {
    const token = getCookieClient('access_token')

    return token === undefined ? false : true
}