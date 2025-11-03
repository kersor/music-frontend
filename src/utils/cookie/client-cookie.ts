export const setCookie = (key: string, value: string, days: number = 0) => {
    if (typeof document === "undefined") return

    const expires = days === 0 ? "" : new Date(Date.now() + days * 24*60*60*1000).toUTCString();
    document.cookie = `${key}=${value}; expires=${expires}; path=/`
}

export const getCookie = (key: string) => {
    if (typeof document === "undefined") return

    return document.cookie
        .split('; ')
        .find((cook) => cook.split('=')[0] === key)
        ?.split('=')[1]
}

export const deleteCookie = (key: string) => {
    if (typeof document === "undefined") return

    document.cookie = key + '=; Max-Age=0; path=/;'; 
}