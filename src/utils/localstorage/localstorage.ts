export const setLocalStorage = (key: string, value: string) => {
    if (typeof localStorage === "undefined") return
    
    localStorage.setItem(key, value);
}

export const getLocalStorage = (key: string) => {
    if (typeof localStorage === "undefined") return
    
    const data = localStorage.getItem(key)
    return data;
}