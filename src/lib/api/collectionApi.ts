import { ICollectionUpdate } from "@/types/collection.type";
import { api } from "../axios";

export const collectionApi = {
    create: async () => {
        const {data} = await api.post('/collection/create')
        return data
    },

    getMyPlaylists: async () => {
        const {data} = await api.get('/collection')
        return data
    },

    getMyPlaylist: async (id: string) => {
        console.log(id)
        const {data} = await api.get(`/collection/${id}`)
        console.log(data)
        return data
    },

    updatePlayList: async (payload: ICollectionUpdate) => {
        console.log(payload)
        const {data} = await api.patch(`/collection/${payload.id}`, payload)
        return data
    }
}