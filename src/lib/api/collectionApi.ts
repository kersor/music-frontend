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
        const {data} = await api.get(`/collection/${id}`)
        return data
    },

    updatePlayList: async (payload: ICollectionUpdate) => {
        const {data} = await api.patch(`/collection/${payload.id}`, payload)
        return data
    }
}