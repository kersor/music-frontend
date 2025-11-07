import { api } from "../axios"

interface ICreate {
    name: string
    filename: string
    image: string
    duration: number
}

export const musicApi = {
    getMe: async () => {
        const {data} = await api.get('/music/me')
        return data
    },
    getAll: async () => {
        const {data} = await api.get('/music')
        return data
    },
    create: async (payload: ICreate) => {
        const {data} = await api.post('/music', payload)
        return data
    }
}