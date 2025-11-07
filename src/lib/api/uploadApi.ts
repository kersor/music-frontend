import { api } from "../axios"

interface IMergeChunks {
    fileId: string
    totalChunks: number
    filename: string
}

export const uploadApi = {
    savePhoto: async (photo: FormData) => {
        const {data} = await api.post('/upload', photo)
        return data
    },
    addChunk: async (formData: FormData) => {
        const {data} = await api.post('/upload/chunk', formData)
        return data
    },
    mergeChunks: async (payload: IMergeChunks) => {
        const {data} = await api.post('/upload/merge', payload)
        return data
    }
}